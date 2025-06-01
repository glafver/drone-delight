const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    price: { type: Number, required: [true, "Please add a price"] },
    image: { type: String, required: [true, "Please add an image URL"] },
    category: { type: String, required: [true, "Please add a category"] },
    isPopular: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
