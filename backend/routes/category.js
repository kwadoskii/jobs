const router = require('express').Router();
let categoryController = require('../controllers/CompanyController');

router.get('/category', categoryController.allCategories);
router.get('/category/:id', categoryController.getOneCategory);
router.post('/category', categoryController.addCategory);
router.patch('/category/:id', categoryController.editCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;