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
                data: {
                    error: err
                }
        }));    
}

exports.addProfile = function(req, res){
    const { name, phone, address, experience, education } = req.body;
    
    profile = new Profile();
    profile.user = req.auth.user.id;
    profile.name = name;
    profile.phone = phone;
    profile.address = address;
    profile.experience = experience;
    profile.education = education;

    profile.save()
        .then(profile => {
            res.send(profile);
        }).catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));    
}

exports.editProfile = function (req, res){
    Profile.findOneAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'email')
        .then(profile => {
            res.status(200).send({
                status: 'success',
                data: profile
            });
        }).catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));   
}