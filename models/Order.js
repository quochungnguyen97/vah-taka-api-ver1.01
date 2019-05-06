const ItemSchema = require('./Item').ItemSchema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  ofUser: {
    type: String,
    required: true
  },
  items: {
    type: [ItemSchema],
    default:[]
  },
  total: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  fullName: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  payment: {
    type: String
  },
  status: {   // CART - ORDERED - CHECKED
    type: String,
    default: "CART"
  }
});

const Order = mongoose.model('order', OrderSchema);

module.exports = Order;
