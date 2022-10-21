const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router.route("/jobs").get(jobController.getAllJobs).post(verifyToken, authorization("Admin", "Hiring-Manager"), jobController.createJob);

router.route("/manager/jobs").get(verifyToken, authorization("Admin", "Hiring-Manager"), jobController.getJobsByManagerToken);



module.exports = router;
