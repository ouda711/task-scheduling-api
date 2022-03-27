require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const AppResponseDto = require('../dtos/responses/app.response.dto');

const checkToken = expressJwt({secret: process.env.JWT_KEY, userProperty: 'decodedJwt', algorithms: ['sha1', 'RS256', 'HS256'],});
const models = require('../models');

const readToken = function(req, res, next){
    if(req.user != null)
        return next();
    if(req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') && req.headers.authorization.split(' ')[0] === 'Bearer' || req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token'){
        checkToken(req, res, next);
    }else{
        return next();
    }
};

exports.isAdmin = (req, res, next) =>{
    if(req.user === null)
        return res.json(AppResponseDto.buildWithErrorMessages('Access denied!! You must log in first'));
    if(req.user.roles.some(role => role.name === 'ROLE_ADMIN'))
        next();
    else
        return res.json(AppResponseDto.buildWithErrorMessages('Access denied!! You are not Admin(Author)'))
};

const getFreshUSer = (required) =>{
    return (req, res, next)=>{
        if(req.decodedJwt == null || req.decodedJwt.userId == null){
            if(required)
                return res.json(AppResponseDto.buildWithErrorMessages('Permission denied'));
            else
                return next();
        }
        models.User.findOne({
            where:{id: req.decodedJwt.userId},include:[models.Role]
        }).then((user)=>{
            if(!user){
                res.status(401).send({error: 'Unauthorized'})
            }else{
                req.user = user;
                next();
            }
        }).catch((err)=>{
            next(err);
        })
    }
}

exports.isAuthenticated = (req, res, next)=>{
    if(req.user != null){
        next();
        return;
    }
    return res.json(AppResponseDto.buildWithErrorMessages('Permission denied!! You must be authenticated'));
};

exports.signToken = (id) =>{
    return jwt.sign(
        {id},
        process.env.JWT_KEY,
        {expiresIn: 360000}
    );
};

exports.mustBeAthenticated = [readToken, getFreshUSer(true)];
exports.loadUser = [readToken, getFreshUSer(false)];

exports.userOwnsItOrIsAdmin = (req,res,next) =>{
    if(req.user != null && (req.user.isAdminSync() || req.userOwnable.userId === req.user.id))
        next();
    else
        return res.json(AppResponseDto.buildWithErrorMessages('This resource does not belong to you'))
};