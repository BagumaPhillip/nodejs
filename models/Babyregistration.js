const mongoose = require("mongoose");

const babyregistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },

  gender: {
    type: String,
    trim: true,
  },

  age: {
    type: String,
    trim: true,
  },

  location: {
    type: String,
    trim: true,
  },

  parent1: {
    type: String,
    trim: true,
  },

  parent2: {
    type: String,
    trim: true,
  },

  babyId: {
    type: String,
    trim: true,
  }
});

module.exports = mongoose.model("Babyregistration", babyregistrationSchema);
