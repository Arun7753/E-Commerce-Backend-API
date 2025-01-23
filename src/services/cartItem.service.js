const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");
const userService = require("../services/user.service.js");

// Create a new cart item
async function createCartItem(cartItemData) {
  // Ensure the product exists and fetch its details
  const product = await Product.findById(cartItemData.product);
  if (!product) {
    throw new Error("Product not found");
  }

  // Create a new cart item
  const cartItem = new CartItem({
    ...cartItemData,
    quantity: 1,
    price: product.price, // Set the price directly from the product
    discountedPrice: product.discountedPrice || product.price, // Use discountedPrice if available, fallback to price
  });

  const createdCartItem = await cartItem.save();
  return createdCartItem;
}

// Update an existing cart item
async function updateCartItem(userId, cartItemId, cartItemData) {
  // Fetch the cart item and populate the product details
  const item = await CartItem.findById(cartItemId).populate("product");
  if (!item) {
    throw new Error(`Cart item not found: ${cartItemId}`);
  }

  // Ensure the user exists
  const user = await userService.findUserById(item.userId);
  if (!user) {
    throw new Error(`User not found: ${userId}`);
  }

  // Allow updates only if the user owns the cart item
  if (user.id === userId.toString()) {
    item.quantity = cartItemData.quantity;
    item.price = item.quantity * item.product.price;
    item.discountedPrice = item.quantity * (item.product.discountedPrice || item.product.price);

    const updatedCartItem = await item.save();
    return updatedCartItem;
  } else {
    throw new Error("You can't update another user's cart item");
  }
}

// Check if a cart item already exists in the user's cart
async function isCartItemExist(cart, product, size, userId) {
  const cartItem = await CartItem.findOne({ cart, product, size, userId }).populate("product");
  return cartItem;
}

// Remove a cart item
async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  const user = await userService.findUserById(cartItem.userId);
  const reqUser = await userService.findUserById(userId);

  if (user.id === reqUser.id) {
    await CartItem.findByIdAndDelete(cartItem.id);
  } else {
    throw new Error("You can't remove another user's item");
  }
}

// Find a cart item by its ID
async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem && cartItem.product) {
    return cartItem;
  } else if (!cartItem) {
    throw new Error(`CartItem not found with id: ${cartItemId}`);
  } else {
    throw new Error(`Product not found for cart item: ${cartItemId}`);
  }
}

// Export all functions
module.exports = {
  createCartItem,
  updateCartItem,
  isCartItemExist,
  removeCartItem,
  findCartItemById,
};
