const router = require('express').Router();
let vacancyController = require('../controllers/CompanyController');

router.get('/vacancy', vacancyController.allVacancies);
router.get('/vacancy/:id', vacancyController.getOneVacancy);
router.post('/vacancy', vacancyController.addVacancy);
router.patch('/vacancy/:id', vacancyController.editVacancy);
router.delete('/vacancy/:id', vacancyController.deleteVacancy);

module.exports = router;