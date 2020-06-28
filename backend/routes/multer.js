const multer = require('multer');
const crypto = require('crypto');

const storage = path => multer.diskStorage({
    destination: `./uploads/${path}`,
    filename: (req, file, cb) => {
        cb(null, crypto.randomBytes(16).toString('hex') + '.' + file.mimetype.substring(file.mimetype.length - 3, file.mimetype.length));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true); //accept file conditions
    }
    else {
        cb(new Error('Invalid Format'), false); //reject
    }
};

exports.upload = (path) => {
    return multer({ 
        storage: storage(path),
        fileFilter: fileFilter, 
        limits : {
            fileSize: 1024 * 1024 * 3 //max image size of 3mb
        }
    });
};