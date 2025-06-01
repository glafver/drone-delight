const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderById,
  getOrdersByUser,
} = require('../controllers/orderController');

// Create a new order
router.post('/', createOrder);

// Get order by ID
router.get('/:id', getOrderById);

// Get orders for a specific user
router.get('/user/:userId', getOrdersByUser);

module.exports = router;
