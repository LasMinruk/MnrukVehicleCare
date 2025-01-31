const express = require("express");
const router = express.Router();

const UserController = require("../Controllers/UserControllers");

// Define the routes for users
router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router; // Export the router
