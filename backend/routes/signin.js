const router = require('express').Router();
let userController = require('../controllers/UserController');

router.post('/', userController.userSignIn );

module.exports = router;