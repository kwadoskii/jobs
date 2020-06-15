const router = require('express').Router();
let userController = require('../controllers/UserController');

router.get('/', userController.userList);
router.get('/:id', userController.user);
// router.post('/', userController.userCreate);
router.patch('/changepassword', userController.changePW);
router.delete('/:id', userController.userDelete);
// router.patch('/changepassword', userController);


module.exports = router;