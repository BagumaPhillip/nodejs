const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");// you have to (npm install passport-local-mongoose) in the terminal first 

const regSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },

  location: {
    type: String,
    trim: true,
  },

  dob: {
    type: Date,
    trim: true,
  },

  gender: {
    type: String,
    trim: true,
  },

  nextOfKin: {
    type: String,
    trim: true,
  },

  nin: {
    type: String,
    trim: true,
  },

  recommender: {
    type: String,
    trim: true,
  },

  religion: {
    type: String,
    trim: true,
  },

  education: {
    type: String,
    trim: true,
  },

  sitterNumber: {
    type: String,
    trim: true,
  },

  phone1: {
    type: String,
    trim: true,
  },

  phone2: {
    type: String,
    trim: true,
  }
});
//passportlocalmongoose only uses username and password so you have to specify the usernameField to email because we want to use email instead
regSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});
module.exports = mongoose.model("Registration", regSchema);

//we will use authenticationRoutes