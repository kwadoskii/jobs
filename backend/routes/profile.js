const router =              require('express').Router();
const profileController =   require('../controllers/ProfileController');


router.get('/', profileController.getProfile);
router.get('/download', profileController.downloadProfile);
router.get('/:id', profileController.getProfileByUser);
router.post('/', profileController.addProfile);
router.patch('/:id', profileController.editProfile);
// router.delete('/:id', profileController.deleteProfile);


module.exports = router;