const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FBUserSchema = new Schema({  
  fbId: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {    
    type: String,
    default: "https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png"
  }
});

const FBUser = mongoose.model('fbuser', FBUserSchema);

module.exports = FBUser;
