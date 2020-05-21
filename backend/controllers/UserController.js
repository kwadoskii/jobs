const User = require('../models/user.model')

exports.userList = function (req, res) {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.user = function (req, res) {
    let id = req.params.id
    User.findById(id)
        .then(user => {
            if(user)
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
            if(user){
                User.findByIdAndDelete(id)
                .then((user) => res.status(201).json({ message: `User id: ${user._id} deleted` }))
                .catch(err => res.status(400).json({ err: err }));
            }
            else
                res.status(400).json({ message: `User id: ${id} not found` });
        })
        .catch(err => res.status(400).json({ err: err }));
    }