
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    contactNo: {
      type: Number,
      require: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      default: "Agent",
    },
    ban: {
      type: Boolean,
      default: "false",
    },
    profilePIC:{
      type: String,
    }

} ,{timestamps: true});

module.exports = mongoose.model('Client', ClientSchema);



