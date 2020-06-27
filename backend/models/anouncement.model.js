const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const anouncementSchema = new Schema({
    title: { type: String, required: 'Please enter a title', trim: true },
},
    {
        timestamps: true,
    }
);


const Anouncement = mongoose.model("Anouncement", anouncementSchema);

module.exports = Anouncement;