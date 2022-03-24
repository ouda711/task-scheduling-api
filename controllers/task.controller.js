const _ = require('lodash');
const sequelize = require('../models/index').Sequelize;
const models = require('../models');

const AppResponseDto = require('../dtos/responses/app.response.dto');
const TaskResponseDto = require('../dtos/responses/task.response.dto');

exports.getAll = (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize =  parseInt(req.query.pageSize) || 5;

    Promise.all([
        models.Task.findAll({
            offset: 0,
            limit: 5,
            order: [
                ['createdAt', 'DESC'],
            ],
            attributes: ['id','title','assigned', 'status', 'deferred','complete', 'in_progress', 'customerId', 'createdAt','updatedAt'],
            include: [
                {
                    model: models.Customer,
                },
                {
                    model: models.Comment
                },
                {
                    model: models.Agent
                }
            ],
            offset: (page - 1) * pageSize,
            limit: pageSize
        }),
        models.Task.findAndCountAll({attributes: ['id']})
    ]).then(results => {
        const tasks = results[0];
        const tasksCount = results[1].count;

        models.Comment.findAll({
            where: {
                taskId: {
                    [sequelize.Op.in]: tasks.map(task => task.id)
                }
            },
            attributes: ['taskId', [sequelize.fn('COUNT', sequelize.col('id')), 'commentsCount']],
            group: 'taskId',
        }).then(results => {
            tasks.forEach(task => {
                let comment = results.find(comment => task.id === comment.taskId);

                if(comment !== null){
                    // console.log(comment)
                    // task.comments_count = comment.get('commentsCount')
                }
                else
                    task.comments_count = 0;
            });
            return res.json(TaskResponseDto.buildPagedList(tasks, page, pageSize, tasksCount, req.baseUrl))
        }).catch(err=>{
            res.json(AppResponseDto.buildWithErrorMessages(err.message))
        })
    }).catch(err=>{
        return res.status(400).send(err.message);
    })
}

exports.getById = (req, res) => {
    const query = _.assign(req.query, {
        include: [
            {model: models.Customer},
            {model: models.Comment},
            {model: models.Agent},
        ]
    });

    models.Task.findOne(query).then(task=>{
        return res.json(TaskResponseDto.buildDetails(task, true, false))
    }).catch(err=>{
        return res.json(AppResponseDto.buildWithErrorMessages(err.message));
    })
}