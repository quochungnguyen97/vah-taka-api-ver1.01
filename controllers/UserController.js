const User = require('../models/User');
const FBUser = require('../models/FBUser');
const Order = require('../models/Order');
const bcrypt = require('bcrypt');

// get all users
// role: everyone
const getAll = (req, res, next) => {
  User.find({}).then(users => res.send(users.map(user => {
    user.password = "";
    return user;
  }))).catch(next);
}

// register controller
// role: everyone
const register = (req, res, next) => {
  delete req.body.role;
  const password = req.body.password;
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  User.create(req.body).then(user => {
    user.password = password;
    Order.create({
      ofUser: user._id
    }).then(() => {
      res.send(user);
    }).catch(next);
  }).catch(next);
}

// get userinfo
// role: own user
const getUser = (req, res, next) => {
  const {userId, type} = req.body;

  if (type === "NORMAL") {
    User.findOne({_id: userId}).then(user => {
      if (user) {
        res.send(user);
      } else res.status(400).send();
    }).catch(next);
  } else {
    FBUser.findOne({fbId: userId}).then(user => {
      if (user) {
        res.send(user);
      } else res.status(400).send();
    }).catch(next);
  }
}

// login controller
// role: everyone
const login = (req, res, next) => {
  const {type, userId, avatar,name,  username, password} = req.body;

  console.log(req.body);

  if (type == "NORMAL") {
    User.findOne({
      username
    }).then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          user.password = password;
          res.send(user);
        } else res.status(401).send();
      }
      else {
        res.status(400).send();
      }
    }).catch(next);
  } else {
    FBUser.findOne({
      fbId: userId
    }).then(user => {
      if (user) {
        if (user.avatar !== avatar || user.name !== name) {
          FBUser.findOneAndUpdate({fbId: userId},{
            avatar,
            name
          }).then(() => {
            console.log("updated");
            FBUser.findOne({fbId: userId}).then(u => {
              res.send(u);
            }).catch(next);
          }).catch(next);
        } else res.send(user);
      } else {
        FBUser.create({
          fbId: userId,
          avatar, 
          name
        }).then(u => {
          Order.create({
            ofUser: u.fbId
          }).then(() => {
            res.send(u);
          }).catch(next);
        }).catch(next);
      }
    }).catch(next);
  }

}

// delete controller
// role: own user
const _delete = (req, res, next) => {
  User.findOne({
    username: req.body.username,
    _id: req.params.id
  }).then(user => {

    if (bcrypt.compareSync(req.body.password, user.password)) {

      User.findByIdAndDelete({_id: user._id}).then(u => {
        res.send(u);
      }).catch(next);

    } else res.status(400).send();

  }).catch(next);
}

// update controller
// role: own user
const update = (req, res, next) => {
  const {password} = req.body;
  
  delete req.body.password;
  delete req.body.role;

  User.findOne({
    username: req.body.username,
    _id: req.params.id
  }).then(user => {
    // console.log(password);
    if (bcrypt.compareSync(password, user.password)) {

      // console.log("pass");
      User.findByIdAndUpdate({_id: user._id}, req.body)
        .then(u => {
          res.send({...u, password});
        }).catch(next);

    } else res.status(400).send();

  }).catch(next);
}

// update password
// role: own user
const updatePassword = (req, res, next) => {

  User.findOne({username: req.body.username}).then(user => {

    if (bcrypt.compareSync(req.body.oldPassword, user.password)) {

      // console.log("pass");
      User.findByIdAndUpdate({_id: user._id}, {password: bcrypt.hashSync(req.body.newPassword, 10)})
        .then(u => {
          res.send({...u, password: bcrypt.hashSync(req.body.newPassword, 10)});
        }).catch(next);

    } else res.status(400).send();

  }).catch(next);
}


const userController = {
  getAll,
  register,
  login,
  _delete,
  update,
  updatePassword,
  getUser
}

module.exports = userController;
