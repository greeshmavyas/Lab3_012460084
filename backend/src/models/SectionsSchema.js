var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//schema
SectionsSchema = new Schema({
  email: {
    type: String,
    default: ""
  },
  section_name: {
    type: String,
    default: ""
  },
  items: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("sections", SectionsSchema);
