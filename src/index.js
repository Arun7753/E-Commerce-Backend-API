const express = require("express");
const cors = require("cors");
const connectDb = require("./db/db");
// const AuthRouter = require("./routes/auth.router");
// const userRouters = require("./routes/user.router")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use("/auth", AuthRouter); 
// app.use("/users", userRouters);


const authRouter=require("./routes/auth.router");
app.use("/auth", authRouter);

const userRouter=require("./routes/user.router");
app.use("/user", userRouter);

const productRouter=require("./routes/product.routes.js");
app.use("/api/products",productRouter);

const adminProductRouter=require("./routes/product.admin.routes.js");
app.use("/api/admin/products",adminProductRouter);

const cartRouter=require("./routes/cart.routes.js")
app.use("/api/cart", cartRouter);

const cartItemRouter=require("./routes/cartItem.routes.js")
app.use("/api/cart_items",cartItemRouter);

const orderRouter=require("./routes/order.routes.js");
app.use("/api/orders",orderRouter);

// const paymentRouter=require("./routes/payment.routes.js");
// app.use('/api/payments',paymentRouter)

const reviewRouter=require("./routes/review.routes.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter=require("./routes/rating.routes.js");
app.use("/api/ratings",ratingRouter);

// admin routes handler
const adminOrderRoutes=require("./routes/adminOrder.routes.js");
app.use("/api/admin/orders",adminOrderRoutes);


// app.get("/", (req, res) => {
//   return res.status(200).send({ message: "Welcome", status: true });
// });

// Port and Server Initialization
const PORT = 800;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });

module.exports = app;
