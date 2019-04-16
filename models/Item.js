const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  properties: {
    type: [String],
    required: true
  },
  brand: {
    type: String
  },
  img: {
    type: String
  },
  number: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  }
});

const Item = mongoose.model('item', ItemSchema);

module.exports.Item = Item;
module.exports.ItemSchema = ItemSchema;
