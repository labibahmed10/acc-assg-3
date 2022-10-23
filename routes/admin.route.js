const express = require("express");
const router = express.Router();
const controller = require("../controller/admin.controller");
const { authorize } = require("../middlewares/authorization");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/candidates", verifyToken, authorize("admin"), controller.getAllCandidates);
router.get("/candidate/:id", verifyToken, authorize("admin"), controller.getCandidate);
router.get("/hiring-manager", verifyToken, authorize("admin"), controller.getHiringManagers);
router.patch("/update-user/:id", verifyToken, authorize("admin"), controller.updateUser);

module.exports = router;
