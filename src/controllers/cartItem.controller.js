const cartItemService = require("../services/cartItem.service.js");

async function updateCartItem(req, res) {
  const user = req.user; // Ensure this is set by the authentication middleware

  if (!user || !user._id) {
    return res.status(401).json({ message: "Unauthorized: User not authenticated" });
  }

  try {
    // Validate `req.params.id` and `req.body` (add validation logic as needed)
    if (!req.params.id) {
      return res.status(400).json({ message: "Cart item ID is required" });
    }

    const updatedCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body);

    return res.status(200).json(updatedCartItem);
  } catch (err) {
    console.error("Error updating cart item:", err.message);
    return res.status(500).json({ message: "Failed to update cart item", error: err.message });
  }
}

async function removeCartItem(req, res) {
  const user = req.user;

  if (!user || !user._id) {
    return res.status(401).json({ message: "Unauthorized: User not authenticated" });
  }

  try {
    // Validate `req.params.id`
    if (!req.params.id) {
      return res.status(400).json({ message: "Cart item ID is required" });
    }

    await cartItemService.removeCartItem(user._id, req.params.id);

    return res.status(200).json({ message: "Item removed successfully", status: true });
  } catch (err) {
    console.error("Error removing cart item:", err.message);
    return res.status(500).json({ message: "Failed to remove cart item", error: err.message });
  }
}

module.exports = { updateCartItem, removeCartItem };
