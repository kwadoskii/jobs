const router = require('express').Router();
let companyController = require('../controllers/CompanyController');

router.get('/company', companyController.all);
router.get('/company/:id', companyController.getOne);
router.post('/company', companyController.add);
router.patch('/company/:id', companyController.edit);
router.delete('/company/:id', companyController.delete);


module.exports = router;