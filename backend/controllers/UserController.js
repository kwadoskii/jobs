const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.userList = function (req, res) {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.user = function (req, res) {
    let id = req.params.id
    User.findById(id)
        .then(user => {
            if (user)
                res.status(200).json(user);
            else
                res.status(400).json({ message: `User id: ${id} not found` });
        }).catch(err => res.status(400).json({ message: err }))
}

exports.userCreate = function (req, res) {
    const user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.address = req.body.address;
    user.experience = req.body.experience;
    user.education = req.body.education;

    user.save()
        .then(user => {
            res.status(201).json({ message: 'User created successfully', id: user._id })
        }).catch(err => res.status(400).json({ err: err }));
}

exports.userPatch = function (req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.status(201).json({ message: `User id: ${user._id} updated successfully` }))
        .catch(err => res.status(400).json({ err: err }));
}

exports.userDelete = function (req, res) {
    let id = req.params.id;
    User.findById(id)
        .then((user) => {
            if (user) {
                User.findByIdAndDelete(id)
                    .then((user) => res.status(201).json({ message: `User id: ${user._id} deleted` }))
                    .catch(err => res.status(400).json({ err: err }));
            }
            else
                res.status(400).json({ message: `User id: ${id} not found` });
        })
        .catch(err => res.status(400).json({ err: err }));
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
                exp: Math.floor(Date.now() / 1000) + (60 * 60), //expires in 1h
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