const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  no: {
    type: String,
    default: ""
  },
  street: {
    type: String,
    default: ""
  },
  ward: {
    type: String,
    default: ""
  },
  district: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  }
});

module.exports = AddressSchema;