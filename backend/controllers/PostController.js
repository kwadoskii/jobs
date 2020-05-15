const Post = require('../models/post.model')

exports.postList = function (req, res){
    Post.find()
        .then(post => res.json(post))
        .catch(err => res.status(400).json({err: err}));
};

exports.post = function(req, res){
    id = req.params.id
    Post.findById(id)
        .then(post => {
            if(post)
                res.status(200).json(post);
            else
                res.status(400).json({ message: `Post id: ${id} not found` });
        })
        .catch(err => res.status(400).json({err: err}));
}

exports.postCreate = function(req, res){
    const postObj = {
        title: req.body.title,
        tags: req.body.tags,
        imgurl: req.body.imgurl,
        details: req.body.details
    }        

    const post = new Post(postObj);
    post.save()
        .then((post) => res.status(201).json({message: 'Post added', id: post._id}))
        .catch(err => res.status(400).json({Error: err}));
}

exports.postPatch = function(req, res){
    let id = req.params.id;
    Post.findByIdAndUpdate(id, req.body, {new: true})
        .then((post) => {
            res.status(201).json({message: `Post id: ${post._id} updated successfully`});
        }).catch(err => res.status(400).json({err: err}));
}

exports.postDelete = function(req, res){
    let id = req.params.id;
    Post.findById(id)
        .then((post) => {
            if(post)
                Post.findByIdAndDelete(id)
                    .then((post) => res.status(201).json({message: `Post id: ${post._id} deleted`}))
                    .catch(err => res.status(400).json({err: err}));
            else
                res.status(400).json({ message: `Post id: ${id} not found` });
        })
        .catch(err => res.status(400).json({ err: err }));    
}