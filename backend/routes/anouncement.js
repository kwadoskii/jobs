const router = require('express').Router();
let anouncementController = require('../controllers/AnouncementController');

router.get('/anouncement', anouncementController.all);
router.get('/anouncement/latest', anouncementController.getLatest);
router.post('/anouncement', anouncementController.add);
router.patch('/anouncement/:id', anouncementController.edit);
router.delete('/anouncement/:id', anouncementController.delete);


module.exports = router;