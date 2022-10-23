const express = require('express');
const router = express.Router()
const controller = require("../Controller/hiringManager.controller");
const { authorize } = require('../Middlewares/authorization');
const { verifyToken } = require('../Middlewares/verifyToken');

router.post('/jobs', verifyToken, authorize('hiring-manager'), controller.createJob)
router.get('/manager/jobs', controller.getAllJobs)
router.get('/manager/jobs/:id', verifyToken, controller.getJob)
router.patch('/jobs/:id', verifyToken, controller.updateJob)

module.exports = router