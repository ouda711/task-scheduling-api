require('dotenv').config();
const jwt = require('jsonwebtoken');
const AppResponseDto = require('../dtos/responses/app.response.dto');
const models = require('../models');

async function auth(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY,null, null)
    console.log(data)
    try {
        const user = await models.User.findOne({
            where: { id: data.userId }
        })
        if (!user) {
            return res.json(AppResponseDto.buildWithErrorMessages('Cannot find user with specified details'))
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json(AppResponseDto.buildWithErrorMessages('Not authorized to access this resource' ))
    }

}
module.exports = auth
