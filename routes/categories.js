const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/CategoryController');

// get all
router.get('/', (req, res, next) => {
  categoryController.getAll(req, res, next);
})

// get by id
router.get('/:id', (req, res, next) => {
  categoryController.getById(req, res, next);
})

// insert
router.post('/', (req, res, next) => {
  categoryController.insert(req, res, next);
})

// update
router.put('/:id', (req, res, next) => {
  categoryController.update(req, res, next);
})

// delete
router.delete('/:id', (req, res, next) => {
  categoryController._delete(req, res, next);
})

module.exports = router;
