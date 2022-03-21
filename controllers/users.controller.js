const _ = require('lodash');
const models = require('../models');
const Op = require('../models/index').Sequelize.Op;
const UserResponseDto = require('../dtos/responses/user.response.dto');
const UserRequestDto = require('../dtos/requests/user.request.dto');
const AppResponseDto = require('../dtos/responses/app.response.dto');

exports.register = (req, res) => {
    const body = req.body;
    const resultBinding = UserRequestDto.createUserRequestDto(body);

    if(!_.isEmpty(resultBinding.errors)){
        return res.status(422).json(AppResponseDto.buildWithErrorMessages(resultBinding.errors));
    }

    const email_address = resultBinding.validatedData.email_address;
    const phone_number = resultBinding.validatedData.phone_number;

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
                console.log(user.toJSON());
                res.json(UserResponseDto.registerDto(user));
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