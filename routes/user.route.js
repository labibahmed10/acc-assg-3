const express = require("express");
const userController = require("../controllers/user.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signup", userController.signup);
router.get("/signup/confirmation/:token", userController.confirmEmail);

router.post("/login", userController.login);

router.get("/me", verifyToken, userController.getMe);

// optional
router.get("/candidates", verifyToken, authorization("Admin"), userController.getCandidates);
router.get("/candidate/:id", verifyToken, authorization("Admin"), userController.getCandidateById)

module.exports = router;
