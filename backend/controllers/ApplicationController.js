const Application = require('../models/application.model');

exports.allApplications = (req, res) => {
    Application.find({ 'user': req.auth.user.id }).sort({ 'createdAt': -1 }).populate([{ path: 'vacancy', populate: { path: 'company', populate: { path: 'category' } } }])
        .then(applications => {
            res.status(200).send({
                status: 'success',
                data: applications
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { err }
        }));
}

exports.getOneApplication = (req, res) => {
    const { id } = req.params;

    Application.findById(id).populate([{ path: 'vacancy', populate: { path: 'company', populate: { path: 'category' } } }])
        .then(application => {
            if (!application) res.status(400).send({ status: 'error', data: { message: 'Application not found' } });
            res.status(200).send({
                status: 'success',
                data: application
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { err }
        }));
}

exports.addApplication = (req, res) => {
    const { body } = req;
    const application = new Application({ ...body });

    application.save()
        .then(application => {
            res.status(201).send({
                status: 'success',
                data: {
                    message: 'Application added successfully',
                    id: application._id
                }
            })
            .catch(err => res.status(400).send({
                status: 'error',
                data: { err }
            }));
            
        })
}

exports.editApplication = (req, res) => {
    const { body } = req;
    const { id } = req.params;

    Application.findById(id)
        .then(application => {
            if(!application) res.status(400).send({ status: 'error', data: { message: 'Application not found' } });
            Application.findByIdAndUpdate(id, { ...body }, { new: true })
                .then(()=> {
                    res.status(201).send({
                        status: 'success',
                        data: { message: 'Application updated ssuccessfully' }
                    })
                })
                .catch(err => res.status(400).send({
                    status: 'error',
                    data: { err }
                }));
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { err }
        }));
}

exports.deleteApplication = (req, res) => {
    const { id } = req.params;

    Application.findById(id)
        .then(application => {
            if (!application) res.status(400).send({ status: 'error', data: { message: 'Application not found' } });
            Application.findByIdAndDelete(id)
                .then(() => {
                    res.status(201).send({ status: 'success', data: { message: 'Applicatiion deleted successfully' } });
                })
                .catch(err => res.status(400).send({
                    status: 'error',
                    data: { err }
                }));
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { err }
        }));
}