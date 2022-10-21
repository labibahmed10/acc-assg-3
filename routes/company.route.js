const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");
const companyController = require("../controller/company.controller");

router.route("/").get(companyController.getCompanies).post(verifyToken, authorization("Admin", "Hiring-Manager"), companyController.createCompany);
router.route("/:id").get(companyController.getCompanyById);

module.exports = router;
