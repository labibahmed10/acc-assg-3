const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");
const authorization = require("../middlewares/authorization");
const pdfUploader = require("../middlewares/pdfUploader");
const verifyToken = require("../middlewares/verifyToken");

// admin or manager could access this
router.route("/jobs").get(jobController.getAllJobs).post(verifyToken, authorization("Admin", "Hiring-Manager"), jobController.createJob);
router.route("/jobs/:id").get(jobController.getJobById).patch(verifyToken, authorization("Admin", "Hiring-Manager"), jobController.updateJob);

// only a candidate can access this
router.route("/jobs/:id/apply").post(verifyToken, authorization("Candidate"), pdfUploader.single("resume"), jobController.applyJob);

// admin or manager could access this
router.route("/manager/jobs").get(verifyToken, authorization("Admin", "Hiring-Manager"), jobController.getJobsByManagerToken);
router.route("/manager/jobs/:id").get(verifyToken, authorization("Admin", "Hiring-Manager"), jobController.getJobByManagerTokenJobId);

router.route("/jobs/highest-paid-jobs").get(jobController.getHighestPaidJobs);
router.route("/jobs/most-applied-jobs").get(jobController.getMostAppliedJobs);

module.exports = router;
