const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads`);
    },
    filename: (req, file, cb) => {
        // cb(null, file.originalname);
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true); //accept file 
    }
    else {
        cb(new Error('Invalid Format'), false); //reject
    }
};

exports.upload = (path) => {
    return multer({ 
        // storage: multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, `./uploads`);
        //     },
        //     filename: (req, file, cb) => {
        //         // cb(null, file.originalname);
        //         cb(null,  Date.now() + '-' + file.originalname);
        //     }
        // }), 
        // limits : {
        //     fileSize: 1024 * 1024 * 5
        // },
        // fileFilter: fileFilter,
    dest: `./uploads/${path}`,
    });
};