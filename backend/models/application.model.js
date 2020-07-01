const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    vacancy: { type: Schema.Types.ObjectId, ref: 'Vacancy' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'new' }
},
    { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;