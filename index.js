const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware - move these before starting the server
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes - move these before starting the server
app.use("/api/products", productRoute);
app.use("/api/users", userRoute); // Make sure to use the actual userRoute instead of the middleware

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Set a default port
const PORT = process.env.PORT || 3001;

mongoose
  .connect(
    "mongodb+srv://sirishtandikar:bDnS2HXCuJHPFOBB@cluster0.c9ogn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });