const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");

router.route("/").get(companyController.getCompanies).post(verifyToken, authorization("Admin", "Hiring-Manager"), companyController.createCompany);



module.exports = router;