const { timeStamp } = require("console");
const mongoose = require("mongoose");

const agentSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      require: true,
    },
    lname: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      max: 30,
      min: 3,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    contactNo: {
      type: Number,
      require: true,
    },
    role: {
      type: String,
      default: "Agent",
    },
    ban: {
      type: Boolean,
      default: "false",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Agent", agentSchema);
