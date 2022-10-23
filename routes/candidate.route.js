const express = require('express');
const controller = require("../Controller/candidate.controller");
const { authorize } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');
const upload = require('../Middlewares/upload');
const router = express.Router()

router.get("/jobs", controller.getAllJobs)
router.get("/jobs/:id", controller.getJob)
router.post("/jobs/:jobId/apply", verifyToken, authorize('candidate'), upload.single("resume"), controller.applyJob )

module.exports = router