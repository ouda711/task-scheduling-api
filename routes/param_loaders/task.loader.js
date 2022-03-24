const models = require('../../models');
const AppResponseDto = require('../../dtos/responses/app.response.dto');
const _ = require('lodash');

function init(router) {
    router.param('taskId', (req, res, next) => {
        req.query = {where: {id: req.params.taskId}};
        next();
    })
}

module.exports = {
    init
};