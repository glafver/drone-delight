const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    address: { type: String, required: [true, "Please add an address"] },
    phone: { type: String, required: [true, "Please add a phone number"] },
    email: { type: String, required: [true, "Please add an email"] },
    paymentMethod: { type: String, required: [true, "Please add a payment method"] },

    order: {
      items: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true },
        },
      ],
      total: { type: Number, required: true },
      count: { type: Number, required: true },
    },

    date: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, 
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
