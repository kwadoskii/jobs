const Company = require('../models/company.model');
const fs = require('fs');

exports.all = (req, res) => {
    Company.find().sort({ name: 1 })
        .then(companies => {
            res.status(200).send({
                status: 'success',
                data: companies
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: {
                error: err
            }
        }));
}

exports.getOne = (req, res) => {
    const { id } = req.params;
    Company.findOne({ _id: id })
        .then(company => {
            res.status(200).send({
                status: 'success',
                data: company
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: {
                error: err
            }
        }));
}

exports.add = (req, res) => {
    const { name, state, country, description } = req.body; //use enctype="multipart/form-data" in form frontend
    const address = { state, country };
    const { filename, path, mimetype } = req.file;
    const logo = { data: fs.readFileSync(path), contentType: mimetype };
    const company = new Company({ name, address, description, logo });

    company.save()
        .then(company => {
            res.status(201).send({
                status: 'success',
                data: {
                    message: `Added successfully`,
                    id: company._id
                }
            })
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: {
                error: err
            }
        }));
}

exports.edit = (req, res) => {
    res.send('edit');
}

exports.delete = (req, res) => {
    const { id } = req.params;

    Company.findById(id)
        .then((company) => {
            if (company)
                Company.findByIdAndDelete(id)
                    .then((company) => {
                        res.status(201).send({
                            status: 'success',
                            data: {
                                message: `Company id: ${company._id} deleted`
                            }
                        });
                    })
                    .catch(err => res.status(400).send({
                        status: 'error',
                        data: {
                            error: err
                        }
                    }));
            else
                res.status(400).json({
                    status: 'error',
                    data: {
                        message: `Company id: ${id} not found`
                    }
                });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: {
                error: err
            }
        }));
}