const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    name: {
        firstname: { type: String, trim: true, min: 3, required: true},
        lastname: { type: String, trim: true, min: 3, required: true },
    },
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
        from: { type: Date, required: true },
        to: { type: Date, default: null },
        currently: { type: Boolean }
    }],
    education: {
        school: [{ 
            name: { type: String, trim: true , required: "name is required" },
            course: { type: String, trim: true , required: "course is required" },
            degree: { type: String, trim: true , required: "degree is required" },
            from: { type: Date, required: true },
            to: { type: Date, required: true}
        }],
    }
},
    {
        timestamps: true,
    }
);


const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;