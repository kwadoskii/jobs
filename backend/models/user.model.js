const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: { 
        firstname: { type: String, required: 'Please enter a firstname', trim: true },
        lastname: { type: String, required: 'Please enter a lastname', trim: true }
    },
    email: { type: String , required: 'Email is required', unique: true },
    address: {
        street: { type: String , trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true }
    },
    phone: { type:  String , trim: true },
    experience: [{
        title: { type: String, trim: true , required: "title is required" },
        company: { type: String, trim: true , required: 'company is required' },
        location: { type: String, trim: true , required: 'location is required' },
        description: { type: String, trim: true },
        from: { type: Date },
        to: { type: Date, default: null },
        currently: { type: Boolean }
    }],
},
    {
        timestamps: true,
    }
);


const User = mongoose.model("User", userSchema);

module.exports = User;