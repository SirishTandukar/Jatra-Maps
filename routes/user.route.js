const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const {getUsers, createUser} = require('../controllers/user.controller.js');

console.log("hello")    
router.get('/', getUsers);
// router.get("/:id", getProduct);

router.post("/", createUser);

// update a product
// router.put("/:id", updateProduct);

// delete a product
// router.delete("/:id", deleteProduct);


module.exports = router;