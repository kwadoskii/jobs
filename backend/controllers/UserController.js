const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.userList = function (req, res) {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));
};

exports.user = function (req, res) {
    let id = req.params.id
    User.findById(id)
        .then(user => {
            if (user)
                res.status(200).json(user);
            else
                res.status(400).json({ message: `User id: ${id} not found` });
        }).catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));
}

// exports.userCreate = function (req, res) {
//     const { name, email, phone, address, experience, education } = req.body;
//     const user = new User({ name, email, phone, address, experience, education });

//     user.save()
//         .then(user => {
//             res.status(201).json({ message: 'User created successfully', id: user._id })
//         }).catch(err => res.status(400).json({ err: err }));
// }

exports.changePW = function (req, res) {
    const { password, currentp } = req.body;
    const id = req.auth.user.id;

    User.findOne({_id: id})
        .then(user => {
            const validPassword = bcrypt.compareSync(currentp, user.password);
            if (!validPassword) { res.status(202).send({ status: 'error', data: { error: 'Current password is wrong!' } }); }
            if (validPassword) {
                const hashpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
                User.findByIdAndUpdate(id, { password: hashpassword }, { new: true })
                    .then(user => res.status(201).send({ status: 'success', data: { message: 'Updated successfully' } }))
                    .catch(err => res.status(400).send({
                        status: 'error',
                        data: {
                            error: err
                        }
                    }));
        }})
        .catch(err => res.status(400).send({
            status: 'error',
            data: {
                error: err
            }
        }));    
}

exports.userDelete = function (req, res) {
    let id = req.params.id;
    User.findById(id)
        .then((user) => {
            if (user) {
                User.findByIdAndDelete(id)
                    .then((user) => res.status(201).json({ message: `User id: ${user._id} deleted` }))
                    .catch(err => res.status(400).send({
                        status: 'error',
                            data: {
                                error: err
                            }
                    }));
            }
            else
                res.status(400).json({ message: `User id: ${id} not found` });
        })
        .catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));
}

//Signin and Register
exports.userSignIn = function (req, res) {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (!user) { res.status(202).send({ status: 'error', data: { error: 'Email does not exist!' } }); }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) { res.status(202).send({ status: 'error', data: { error: 'Password is wrong!' } }); }

            //create token
            const token = jwt.sign({
                user: {
                    id: user._id,
                    email: user.email
                },
                exp: Math.floor(Date.now() / 1000) + (10 * 60 * 60), //expires in 1h
            }, process.env.TOKEN_SECRET);
            res.status(200).send({
                status: 'success',
                data: {
                    token: token
                }
            });
        }).catch(err => {
            res.status(400).send({
                status: 'error',
                data: {
                    error: err
                }
            });
        });
}

exports.userSignUp = function (req, res) {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) { res.status(202).send({ status: 'error', data: { error: 'Email already exist!' } }) };

            user = new User();
            user.email = email;

            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(password, salt);

            user.password = hashpassword;
            user.save()
                .then(user => {
                    res.status(201).send({
                        status: 'success',
                        data: {
                            user: {
                                id: user._id,
                                email: user.email,
                            }
                        }
                    });
                }).catch(err => {
                    res.status(400).send({
                        status: 'error',
                        data: {
                            error: err
                        }
                    });
                });
        }).catch(err => {
            res.status(400).send({
                status: 'error',
                data: {
                    error: err
                }
            });
        });
}