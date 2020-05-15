const router = require('express').Router();
let postController = require('../controllers/PostController');

router.get('/', postController.postList);
router.get('/:id', postController.post);
router.post('/', postController.postCreate);
router.patch('/:id', postController.postPatch);
router.delete('/:id', postController.postDelete);


module.exports = router;