const router = require('express').Router();
let userController = require('../controllers/UserController');

router.get('/', userController.userList);
router.get('/:id', userController.user);
router.post('/', userController.userCreate);
router.patch('/:id', userController.userPatch);
router.delete('/:id', userController.userDelete);


module.exports = router;