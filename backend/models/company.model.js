const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
    name: { type: String, required: true },
    address: { 
        state: { type: String, required: true },
        country: { type: String, required: true }
    },
    description: { type: String, required: true },
    logo: { data: Buffer, contentType: String },
    logolink: { type: String },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'
    },
},
{
    timestamps: true,
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;