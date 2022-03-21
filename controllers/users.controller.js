const _ = require('lodash');
require('dotenv').config();
const crypto = require('crypto');
const models = require('../models');
const Op = require('../models/index').Sequelize.Op;
const UserResponseDto = require('../dtos/responses/user.response.dto');
const UserRequestDto = require('../dtos/requests/user.request.dto');
const AppResponseDto = require('../dtos/responses/app.response.dto');
const VerificationMailer = require('../helpers/mailer/verification.helper.mailer');

exports.register = (req, res) => {
    const body = req.body;
    const resultBinding = UserRequestDto.createUserRequestDto(body);

    if(!_.isEmpty(resultBinding.errors)){
        return res.status(422).json(AppResponseDto.buildWithErrorMessages(resultBinding.errors));
    }

    const email_address = resultBinding.validatedData.email_address;
    const phone_number = resultBinding.validatedData.phone_number;
    const hash = crypto.createHmac('sha256',email_address).update('Task-Scheduling-API').digest('hex');

    models.User.findOne({
        where: {
            [Op.or]: [{email_address}, {phone_number}]
        }
    }).then((user) => {
        if(user){
            const errors = {};
            if(user.phone_number === body.phone_number)
                errors.phone_number = `Phone number: ${body.phone_number} is already taken`;
            if(user.email_address === body.email_address)
                errors.email_address = `Email address ${body.email_address} is already taken`;
            if(!_.isEmpty(errors)){
                return res.status(403).json(AppResponseDto.buildWithErrorMessages(errors));
            }
        }

        models.User.create(resultBinding.validatedData).then((user) => {
            if(user === null){
                throw user;
            }

            if(user) {
                let hostname = req.headers.host;

                let url = null;
                if(process.env.NODE_ENV === 'production'){
                    url = `https://${hostname}/api/v1/users/confirm/${hash}`;
                }else{
                    url = `http://localhost:${process.env.PORT}/api/v1/users/confirm/${hash}`
                }
                console.log(user.toJSON());
                res.json(UserResponseDto.registerDto(user));
                VerificationMailer.send(email_address, hash, url).then(r => console.log('Success'));
            }else{
                console.log('No user');
            }
        }).catch(error => {
            return res.status(400).send(AppResponseDto.buildWithErrorMessages(error));
        })
    }).catch(err => {
        return res.status(400).send(AppResponseDto.buildWithErrorMessages(err));
    })
}

exports.login = (req, res) => {
    const phone_number = req.body.phone;
    const password = req.body.password;

    if(!phone_number || !password) {
        return res.status(400).send(AppResponseDto.buildWithErrorMessages('Please provide your phone and password'));
    }

    models.User.findOne({
        where: {phone_number},
        include: [
            {
                model: models.Role,
                attributes: ['name']
            }
        ]
    }).then((user) => {
        if (user && user.isValidPassword(password) && user.is_verified === true && user.status === true) {
            req.user = user;
            return res.status(200).json(UserResponseDto.loginSuccess(user));
        }else if(user && user.isValidPassword(password) && user.is_verified === true && user.status === false){
            return res.status(401).json(AppResponseDto.buildWithErrorMessages('This account is suspended. Contact admin'));
        }else if(user && user.isValidPassword(password) && user.is_verified === false && user.status === true){
            return res.status(401).json(AppResponseDto.buildWithErrorMessages('Please verify your account before you continue'));
        }else if(user && !user.isValidPassword(password) && user.is_verified === true && user.status === true){
            return res.status(401).json(AppResponseDto.buildWithErrorMessages('Wrong password provided'));
        } else
            return res.json(AppResponseDto.buildWithErrorMessages('Failed more than two cases. Try again'));
    }).catch(err=>{
        res.json(AppResponseDto.buildWithErrorMessages(err))
    })
}

exports.confirm = (req, res) => {
    models.Authenticate.findOne({
        where: {token: req.params.ehash},
        attributes: ['createdAt', 'email_address', 'is_used']
    }).then((info) => {
        const oneHour = 1000 * 60;
        if(Date() - info.get('createdAt') > oneHour ){
            return res.status(409).json(AppResponseDto.buildWithErrorMessages('Verification link expired'))
        }
        if(info.get('is_used') === true){
            return res.status(200).json(AppResponseDto.buildWithErrorMessages('Verification link already used'));
        }
        else{
            models.User.update(
                {status: true, is_verified: true},
                {where: {email_address: info.get('email_address')}}
            ).then((rows) => {
                models.Authenticate.update(
                    {is_used: true},
                    {where: {email_address: info.get('email_address')}}
                ).then(() => {
                    res.status(200).json(AppResponseDto.buildSimpleSuccessWithMessages('Account verified successfully'));
                }).catch(err=> res.json(AppResponseDto.buildWithErrorMessages(err)))
            })
        }
    }).catch(err=>{
        res.json(AppResponseDto.buildWithErrorMessages(err));
    })
}