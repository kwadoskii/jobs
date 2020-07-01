const router = require('express').Router();
let applicationController = require('../controllers/ApplicationController');

router.get('/application', applicationController.allApplications);
router.get('/application/:id', applicationController.getOneApplication);
router.post('/application', applicationController.addApplication);
router.patch('/application/:id', applicationController.editApplication);
router.delete('/application/:id', applicationController.deleteApplication);


module.exports = router;