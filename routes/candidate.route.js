const express = require("express");
const controller = require("../controller/candidate.controller");
const { authorize } = require("../middlewares/authorization");
const { verifyToken } = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");
const router = express.Router();

router.get("/jobs", controller.getAllJobs);
router.get("/jobs/:id", controller.getJob);
router.post("/jobs/:jobId/apply", verifyToken, authorize("candidate"), upload.single("resume"), controller.applyJob);

module.exports = router;
