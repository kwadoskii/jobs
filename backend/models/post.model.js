const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: 'Please enter a title', trim: true },
    imgurl: { type: String },
    tags: { type: Array },
    details: { type: String }
},
    {
        timestamps: true,
    }
);


const Post = mongoose.model("Post", postSchema);

module.exports = Post;