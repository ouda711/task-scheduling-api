const router = require('express').Router();
const controller = require('../controllers/users.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/forget-password', controller.passwordResetEmail);
router.get('/confirm/:ehash',controller.confirm);

module.exports = router