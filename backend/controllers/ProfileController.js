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
    const { name, phone, address, experience, education, coverletter } = req.body;
    
    profile = new Profile({ name, phone, address, experience, education, coverletter });
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
    const { id } = req.params;
    Profile.findById(id)
        .then(profile => {
            if (!profile) res.status(400).send({ status: 'error', data: { message: 'Profile not found' } });
            Profile.findByIdAndUpdate(id, req.body, { new: true }).populate('user', 'email')
                .then(profile => {
                    res.status(200).send({
                        status: 'success',
                        data: profile
                    });
                })
                .catch(err => res.status(400).send({
                    status: 'error',
                    data: { error: err }
                }));   
        })
        .catch(err => res.status(400).send({
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

exports.getProfileByUser = function (req, res) {
    const {id} = req.params;

    Profile.findOne({user: id})
        .then(profile => {
            res.status(200).send({
                status: 'success',
                data: profile
            });
        })
        .catch(err => {
            res.status(400).send({
                status:'error',
                data: { error: err }
            })
        })
}