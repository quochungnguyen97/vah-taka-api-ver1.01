const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

// get list of users from database
router.get('/', function(req, res, next){
  userController.getAll(req, res, next);
});

// register
router.post('/register', (req, res, next) => {
  userController.register(req, res, next);
});

// login
router.post('/login', (req, res, next) => {
  userController.login(req, res, next);
});

// delete
router.delete('/:id', (req, res, next) => {
  userController._delete(req, res, next);
});

// update
router.put('/:id', (req, res, next) => {
  userController.update(req, res, next);
});

// update password
router.post('/update_password', (req, res, next) => {
  userController.updatePassword(req, res, next);
});

// get user
router.post('/get_user', (req, res, next) => {
  userController.getUser(req, res, next);
})

module.exports = router;
