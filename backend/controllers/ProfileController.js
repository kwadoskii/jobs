const Profile = require('../models/profile.model');


exports.getProfile = function (req, res){
    Profile.findOne({ user: req.auth.user.id }).populate('user', 'email')
        .then(profile => {
            res.status(200).send({
                status: 'success',
                data: profile
            });
        }).catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));    
}

exports.addProfile = function(req, res){
    const { name, phone, address, experience, education } = req.body;
    
    profile = new Profile({ name, phone, address, experience, education });
    profile.user = req.auth.user.id;

    profile.save()
        .then(profile => {
            res.send(profile);
        }).catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));    
}

exports.editProfile = function (req, res){    
    Profile.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate('user', 'email')
        .then(profile => {
            res.status(200).send({
                status: 'success',
                data: profile
            });
        }).catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));   
}

exports.downloadProfile = function (req, res){
    Profile.findOne({ user: req.auth.user.id }).populate('user', 'email').select(['name', 'phone', 'address', 'experience', 'education']).lean()
        .then(profile => {
            res.status(200).send({
                ...profile
            });
        }).catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));    
}