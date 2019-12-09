var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//schema
OwnersSchema = new Schema({
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  first_name: {
    type: String,
    default: ""
  },
  last_name: {
    type: String,
    default: ""
  },
  phone_number: {
    type: Number,
    default: ""
  }
});

module.exports = mongoose.model("owners", OwnersSchema);
