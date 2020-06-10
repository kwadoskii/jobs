const router = require('express').Router();
let userController = require('../controllers/UserController');

router.post('/', userController.userSignUp );

module.exports = router;