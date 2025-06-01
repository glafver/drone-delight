// controllers/orderController.js
const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const User = require("../models/User");

// @desc    Create a new order
// @route   POST /api/orders
// @access  Public or Protected (depending on your auth setup)
const createOrder = asyncHandler(async (req, res) => {
  const { name, address, phone, email, paymentMethod, order, date, userId } =
    req.body;

  if (!order || !order.items || order.items.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const newOrder = new Order({
    name,
    address,
    phone,
    email,
    paymentMethod,
    order,
    date,
    userId,
  });

  const createdOrder = await newOrder.save();
  res.status(201).json({ id: createdOrder._id.toString()});
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Public or Protected
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("order.items.product", "name price image") // Populates product details
    .populate("userId", "name email"); // Populates user details

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get orders for a specific user
// @route   GET /api/orders/user/:userId
// @access  Public or Protected
const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId })
    .sort({ createdAt: -1 })
    .populate("order.items.product", "name price");

  res.json(orders);
});

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUser,
};
