const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  ID: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    default: ""
  }
});

const Category = mongoose.model('category', CategorySchema);

module.exports.Category = Category;
module.exports.Schema = CategorySchema;
