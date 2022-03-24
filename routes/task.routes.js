const router = require('express').Router();
const controller =  require('../controllers/task.controller');
require('./param_loaders/task.loader').init(router);
const AuthMiddleware = require('../middlewares/auth.middleware');

router.get('', AuthMiddleware,controller.getAll);
router.get('/by_id/:taskId', AuthMiddleware, controller.getById);

module.exports = router