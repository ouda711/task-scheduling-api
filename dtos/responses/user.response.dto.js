const RolesDto = require('./role.response.dto');

function registerDto(user) {
    return {
        success: true,
        full_messages: ['User registered successfully']
    };
}

function loginSuccess(user) {
    const token = user.generateJwt();
    return {
        success: true,
        token: token,
        user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            roles: RolesDto.toNameList(user.roles || [])
        }
    }
}

function buildOnlyForIdAndPhone(user) {
    if(user === null)
        return {};
    return {
        id: user.id,
        phone_number: user.phone_number
    }
}

module.exports = {
    registerDto, loginSuccess, buildOnlyForIdAndPhone
};