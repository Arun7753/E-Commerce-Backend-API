const orderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders); // Changed status code to 200
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
};

const confirmedOrder = async (req, res) => { // Added async
  try {
    const orderId = req.params.orderId;
    const order = await orderService.confirmedOrder(orderId); // Added await
    res.status(200).json(order); // Changed status code to 200
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const shippOrder = async (req, res) => { // Added async
  try {
    const orderId = req.params.orderId;
    const order = await orderService.shipOrder(orderId); // Added await
    return res.status(200).send(order); // Changed status code to 200
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deliverOrder = async (req, res) => { // Added async
  try {
    const orderId = req.params.orderId;
    const order = await orderService.deliveredOrder(orderId); // Fixed method name and added await
    return res.status(200).send(order); // Changed status code to 200
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const cancelledOrder = async (req, res) => { // Added async
  try {
    const orderId = req.params.orderId;
    const order = await orderService.cancelledOrder(orderId); // Added await
    return res.status(200).send(order); // Changed status code to 200
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const deleteOrder = async (req, res) => { // Added async
  try {
    const orderId = req.params.orderId;
    await orderService.deleteOrder(orderId); // Added await
    res
      .status(200) // Changed status code to 200
      .json({ message: "Order Deleted Successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAllOrders,
  confirmedOrder,
  shippOrder,
  deliverOrder,
  cancelledOrder,
  deleteOrder,
};
