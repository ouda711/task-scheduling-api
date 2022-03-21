const router = require('express').Router();
const controller = require('../controllers/users.controller');

router.post('/register', controller.register);

module.exports = router