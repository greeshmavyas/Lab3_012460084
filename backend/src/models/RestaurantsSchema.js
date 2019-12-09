var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//schema
RestaurantsSchema = new Schema({
  email: {
    type: String,
    default: ""
  },
  cuisine: {
    type: String,
    default: ""
  },
  restaurant_name: {
    type: String,
    default: ""
  },
  zip_code: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("restaurants", RestaurantsSchema);
