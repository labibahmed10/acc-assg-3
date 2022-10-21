const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router.route("/jobs/highest-paid-jobs").get(jobController.getHighestPaidJobs);

module.exports = router;
