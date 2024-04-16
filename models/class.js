//Introducing mongoose to the model file
const mongoose = require("mongoose");

//Access the shema function in mongoose
const Schema = mongoose.Schema;

//using the function to build the Schema
const contactSchema = new Schema({
    email: {type: String},
    password: {type: String, trim: true}, 
    address: {type: String},  
    apartment: {type: Number},
    city: {type: String},
    state: {type: String},
    zip: {type: Number},
    checkout: {type: String}
})

module.exports = mongoose.model("Contact", contactSchema);