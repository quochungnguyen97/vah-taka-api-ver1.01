const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

// order
// role: everyone
router.post('/order', (req, res, next) => {
  orderController.order(req, res, next);
})

// get all orders
// role: Ad
router.post('/', (req, res, next) => {
  orderController.getAll(req, res, next);
})

// get order
// role: Own User, Ad
router.post('/get/:id', (req, res, next) => {
  orderController.get(req, res, next);
})

// delete order
// role: Ad
router.delete('/:id', (req, res, next) => {
  orderController._delete(req, res, next);
})

// mark done
// role: Ad
router.put('/:id', (req, res, next) => {
  orderController.checked(req, res, next);
})

// create cart
// role: own user
router.post('/create_cart', (req, res, next) => {
  orderController.createCart(req, res, next);
})

// add to cart
// role: own user
router.post('/add_to_cart', (req, res, next) => {
  orderController.addToCart(req, res, next);
})

// get orders of user
// role: ad, own user
router.post('/of_user/:id', (req, res, next) => {
  orderController.getOrdersOfUser(req, res, next);
})

module.exports = router;
