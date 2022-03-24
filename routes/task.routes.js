const router = require('express').Router();
const controller =  require('../controllers/task.controller');
require('./param_loaders/task.loader').init(router);

router.get('', controller.getAll);
router.get('/by_id/:taskId', controller.getById);

module.exports = router