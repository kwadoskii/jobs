const router =              require('express').Router();
const profileController =   require('../controllers/ProfileController');


// router.get('/', profileController.userList);
// router.delete('/:id', profileController.userDelete);
router.get('/', profileController.getProfile);
router.post('/', profileController.addProfile);
router.patch('/:id', profileController.editProfile);


module.exports = router;