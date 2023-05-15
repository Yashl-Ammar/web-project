const { timeStamp } = require("console");
const mongoose = require("mongoose");

const propertyschema = mongoose.Schema(
  {
    Title: {
      type: String,
      require: true,
      unique: true
    },
    description: {
      type: String,
      require: true,
    },
    purpose: {
      type: String,
      require: true,
    },
    propertytype: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    Area: {
      type: Number,
      require: true,
    },
    length: {
      type: Number,
    },
    width: {
      type: Number,
    },
    pics: { type: [String] },
    email: {
      type: String,
      require: true,
    },
    mobileNo: {
      type: Number,
      require: true,
    },
    landline: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertyschema);
