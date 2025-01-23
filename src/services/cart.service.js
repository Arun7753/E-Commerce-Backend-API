const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");

// Find a user's cart and update cart details
async function findUserCart(userId) {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId });
    await cart.save();
  }

  const cartItems = await CartItem.find({ cart: cart._id }).populate("product");

  cart.cartItems = cartItems;

  let totalPrice = 0;
  let totalDiscountedPrice = 0;
  let totalItem = 0;

  for (const cartItem of cart.cartItems) {
    totalPrice += cartItem.price * cartItem.quantity;
    totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity;
    totalItem += cartItem.quantity;
  }

  cart.totalPrice = totalPrice;
  cart.totalItem = totalItem;
  cart.totalDiscountedPrice = totalDiscountedPrice;
  cart.discount = totalPrice - totalDiscountedPrice;

  return cart;
}

// Add an item to the user's cart
async function addCartItem(userId, req) {
  try {
    // Find user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId });
      await cart.save();
    }

    // Find product by ID
    const product = await Product.findById(req.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if item is already in the cart
    let cartItem = await CartItem.findOne({ cart: cart._id, product: product._id });

    if (cartItem) {
      // If the item exists, increment its quantity
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // Add new item to the cart
      cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price, // Use the original product price
        discountedPrice: product.discountedPrice || product.price, // Fallback to price if discountedPrice is undefined
        size: req.size,
      });

      await cartItem.save();
    }

    return "Item added to cart";
  } catch (error) {
    throw new Error("Failed to add item to cart: " + error.message);
  }
}

module.exports = { findUserCart, addCartItem };
