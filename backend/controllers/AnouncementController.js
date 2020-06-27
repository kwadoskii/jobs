const Anouncement = require('../models/anouncement.model');

exports.all = (req, res) =>{
    Anouncement.find().sort({createdAt: -1}).select('title')
        .then(anouncement => res.status(200).send({
            status: 'success',
            data: anouncement
        }))
        .catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));
}

exports.getLatest = function (req, res){
    Anouncement.findOne().sort({ 'createdAt': -1 }).select('title')
        .then(anouncement => res.status(200).send({
            status: 'success',
            data: {
                anouncement
            }}))
        .catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));
};

exports.add = function (req, res) {
    const { title } = req.body;
    anouncement = new Anouncement({ title });

    anouncement.save()
        .then(anouncement => res.status(201).send({
            status: 'success',
            data: {
                message: "Addedd Successfully",
                id: anouncement._id,
                title: anouncement.title
            }
        }))
        .catch(err => res.status(400).send({
            status: 'error',
            data: {
                error: err
            }
        }));
};

exports.edit = (req, res) => {
    const { body } = req;
    const { id } = req.params;

    Anouncement.findByIdAndUpdate(id, body , { new: true })
        .then((anouncement) => {
            res.status(201).json({
                status: 'success',
                message: `Anouncement id: '${anouncement._id}' updated successfully`
            });
        }).catch(err => res.status(400).send({
            status: 'error',
                data: {
                    error: err
                }
        }));
}

exports.delete = (req, res) => {
    const { id } = req.params;

    Anouncement.findByIdAndDelete(id)
        .then(anouncement => {
            res.status(201).send({
                status: 'success',
                message: `Anouncement id ${anouncement._id} deleted successfully`
            });
        }).catch(err => res.status(400).send({
            status: 'error',
            data: {
                error: err
            }
        }));
}