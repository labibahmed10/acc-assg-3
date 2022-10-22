const express = require("express");
const userController = require("../controller/user.controller");
const authorization = require("../middlewares/authorization");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

// optional
router.post("/signup", userController.signup);
router.get("/signup/confirmation/:token", userController.confirmEmail);
router.post("/login", userController.login);

// confirmation
router.get("/me", verifyToken, userController.getMe);

// admin routes
router.get("/candidates", verifyToken, authorization("Admin"), userController.getCandidates);
router.get("/candidate/:id", verifyToken, authorization("Admin"), userController.getCandidateById);
router.get("/hiring-managers", verifyToken, authorization("Admin"), userController.getManagers);
router.put("/promote/:id", verifyToken, authorization("Admin"), userController.promoteUserRole);

module.exports = router;
