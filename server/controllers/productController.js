const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

// @desc    Get all products with optional filtering for popular products
// @route   GET /api/products 
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { isPopular } = req.query;

    const filter = {};
  if (isPopular === 'true') {
    filter.isPopular = true;
  }

  const products = await Product.find(filter);
  res.status(200).json(products);
});

module.exports = {
  getProducts,
};
