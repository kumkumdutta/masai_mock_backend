
const mongoose = require("mongoose")

const empSchema = mongoose.Schema({
    "fname":String,
    "lname":String,
    "email":String,
    "department":String,
    "salary":String,
},{
    versionKey:false
})


const empModel = mongoose.model("emp",empSchema)

module.exports = empModel