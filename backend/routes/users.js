const express = require("express");
const { authUser } = require("../basicAuth");
const userController = require("../controllers/user");

const router = express.Router();

// CRUD api's related to authorization and authentication
router.get("/getCurrentUser", authUser, userController.getCurrentUser);
router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
