const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/signup", controller.signUp);
router.post("/login", controller.singIn);
router.get("/me", verifyToken, controller.me);

module.exports = router;
