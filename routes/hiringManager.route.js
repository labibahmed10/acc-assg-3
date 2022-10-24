const express = require("express");
const router = express.Router();
const controller = require("../controller/hiringManager.controller");
const { authorize } = require("../middlewares/authorization");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/jobs", verifyToken, authorize("hiring-manager"), controller.createJob);
router.get("/manager/jobs",verifyToken, authorize("hiring-manager"), controller.getAllJobs);
router.get("/manager/jobs/:id", verifyToken, controller.getJob);
router.patch("/jobs/:id", verifyToken, controller.updateJob);

module.exports = router;
