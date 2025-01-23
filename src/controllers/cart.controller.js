const express = require("express");
const router = express.Router();
const cartService = require("../services/cart.service.js");

const findUserCart = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    const cart = await cartService.findUserCart(user.id);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching user cart:", error.message);
    res.status(500).json({ message: "Failed to get user cart", error: error.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user._id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    // Validate request body
    const { productId, size } = req.body;
    if (!productId || !size) {
      return res.status(400).json({ message: "Product ID and size are required" });
    }

    await cartService.addCartItem(user._id.toString(), req.body);

    res.status(202).json({ message: "Item Added To Cart Successfully", status: true });
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    res.status(500).json({ message: "Failed to add item to cart", error: error.message });
  }
};

module.exports = { findUserCart, addItemToCart };
