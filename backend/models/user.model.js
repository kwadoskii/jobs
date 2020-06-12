const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    email: { type: String , required: 'Email is required', unique: true, trim: true},
    password: { type: String, required: true, trim: true },
},
    {
        timestamps: true,
    }
);


const User = mongoose.model("User", userSchema);
module.exports = User;