const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    vacancy: { type: Schema.Types.ObjectId, ref: 'Vacancy' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'New' },
    attachments: [
        { doctype: { type: String }, path: { type: String }, filename: { type: String } }
    ]
},
    { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;