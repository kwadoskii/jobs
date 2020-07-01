const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vacancySchema = new Schema({
    title: { type: String, required: 'Title is required', trim: true },
    description: { type: String, required: true },
    requirement: { type: String, required: true },
    salary: { type: Number },
    deadline: { type: Date, required: true },
    minyear: { type: Number },
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
},
    { timestamps: true }
);

const Vacancy = mongoose.model("Vacancy", vacancySchema);
module.exports = Vacancy;