const Company = require('../models/company.model');
const Category = require('../models/category.model');
const fs = require('fs');

exports.allCompanies = (req, res) => {
    Company.find().sort({ name: 1 }).populate('category', 'name')
        .then(companies => {
            res.status(200).send({
                status: 'success',
                data: companies
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));
}

exports.getOneCompany = (req, res) => {
    const { id } = req.params;
    Company.findOne({ _id: id }).populate('category', 'name')
        .then(company => {
            if(!company) res.status(400).send({ status: 'error', data: { message: 'Company not found' } });
            res.status(200).send({
                status: 'success',
                data: company
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));
}

exports.addCompany = (req, res) => {
    const { name, state, country, description, category } = req.body; //use enctype="multipart/form-data" in form frontend
    const address = { state, country };
    const { path, mimetype } = req.file;
    const logo = { data: fs.readFileSync(path), contentType: mimetype };
    const company = new Company({ name, address, description, logo, category });

    company.save()
        .then(company => {
            res.status(201).send({
                status: 'success',
                data: {
                    message: `Company added successfully`,
                    id: company._id
                }
            })
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));
}

exports.editCompany = (req, res) => {
    const { id } = req.params;
    const { body } = req;

    Company.findById(id)
        .then(company => {
            if(!company) res.status(400).send({ status: 'error', data: { message: 'Company not found' } });
            Company.findByIdAndUpdate(id, body, { new: true })
                .then(company => {
                    res.status(201).send({
                        status: 'successs',
                        data: { message: 'Company updated successfully'}                        
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

exports.deleteCompany = (req, res) => {
    const { id } = req.params;

    Company.findById(id)
        .then((company) => {
            if (!company) res.status(400).json({ status: 'error', data: { message: `Company id: ${id} not found` } });
            Company.findByIdAndDelete(id)
                .then((company) => {
                    res.status(201).send({
                        status: 'success',
                        data: {
                            message: `Company deleted successfully`
                        }
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


//category APIs
exports.allCategories = (req, res) => {
    Category.find().sort({ name: 1 })
        .then(categories => {
            res.status(200).send({
                status: 'success',
                data: categories
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));
}

exports.getOneCategory = (req, res) => {
    const { id } = req.params;
    Category.findOne({ _id: id })
        .then(category => {
            if(!category) res.status(400).send({ status: 'error', data: { message: 'Categoty not found' } });
            res.status(200).send({
                status: 'success',
                data: category
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));
}

exports.addCategory = (req, res) => {
    const { name } = req.body;
    category = new Category({ name });

    category.save()
        .then(category => {
            res.status(200).send({
                status: 'success',
                data: {
                    message: 'Category added successfully'
                }
            });
        })
        .catch(err => res.status(400).send({
            status: 'error',
            data: { error: err }
        }));
}

exports.editCategory = (req, res) => {
    const {name} = req.body;
    const {id} = req.params;
    
    Category.findById(id)
        .then(category => {
            if (!category) res.status(400).send({ status: 'error', data: { message: 'Categoty not found' } });
            Category.findByIdAndUpdate(id, { name }, { new: true })
                .then(category => {
                    res.status(201).send({
                        status: 'success',
                        data: {
                            message: 'Category Updated successfully',
                            id: category._id
                        }
                    })
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

exports.deleteCategory = (req, res) => {
    const {id} = req.params;

    Category.findById(id)
        .then(category => {
            if (!category) res.status(400).send({ status: 'error', data: { message: 'Categoty not found' } });
            Category.findByIdAndDelete(id)
                .then(() => {
                    res.status(201).send({
                        status: 'success',
                        data: {
                            message: 'Category Deleted successfully'
                        }
                    })
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