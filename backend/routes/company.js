const router = require('express').Router();
let companyController = require('../controllers/CompanyController');

router.get('/company', companyController.allCompanies);
router.get('/company/:id', companyController.getOneCompany);
router.post('/company', companyController.addCompany);
router.patch('/company/:id', companyController.editCompany);
router.delete('/company/:id', companyController.deleteCompany);

module.exports = router;