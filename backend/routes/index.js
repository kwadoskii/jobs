const router =          require('express').Router();
const userRouter =      require('./user');
const postRouter =      require('./post');
const signinRouter =    require('./signin');
const signupRouter =    require('./signup');
const profileRouter =   require('./profile');
const auth =            require('./auth');
const anouncementRouter =     require('./anouncement');
const companyRouter =     require('./company');
const categoryRouter =     require('./category');
const verify =          require('./verify'); //for auth
const upload = require('../routes/multer').upload('company');


router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/auth', auth);
router.use('/users', verify, userRouter);
router.use('/posts', verify, postRouter);
router.use('/profile', verify, profileRouter);
router.use('/settings', upload.single('logo'), [anouncementRouter, companyRouter, categoryRouter]);

router.use(function(req, res){
    res.status(400).send({
        status: 'error',
        data:{
            error: 'Invalid endpoint reached!'
        }
    });
});

module.exports = router;