const service = require("../service/hiringManager.service");

exports.createJob = async (req, res) => {
   let { ...jobInfo } = req.body;

   try {
      jobInfo = { ...jobInfo, postedBy: { name: req.user.name, id: req.user._id } };

      const job = await service.createJobService(jobInfo);

      res.status(201).json({
         status: "Success",
         message: "Job created successfully",
         data: job,
      });
   } catch (error) {
      res.status(500).json({
         status: "Failed",
         error: error.message,
      });
   }
};

exports.getAllJobs = async (req, res) => {
   try {
      const { email } = req.user;
      const thisManager = await service.findUserByEmail(email);
      const jobs = await service.getJobsService(thisManager);

      res.status(201).json({
         status: "Success",
         message: "Got all the jobs of this hiring manager",
         data: jobs,
      });
   } catch (error) {
      res.status(500).json({
         status: "Failed",
         error: error.message,
      });
   }
};

exports.getJob = async (req, res) => {
   try {
      const { id } = req.params;
      const job = await service.getJobService(id, req.user._id);

      if (!job) {
         return res.status(400).json({
            status: "Fail",
            message: "No Job Data found!",
         });
      }

      res.status(500).json({
         status: "Success",
         data: job,
      });
   } catch (error) {
      res.status(500).json({
         status: "Failed",
         error: error.message,
      });
   }
};

exports.updateJob = async (req, res) => {
   const { id } = req.params;
   const jobInfo = req.body;

   try {
      const updatedJobDetails = await service.updateJobService(id, req.user._id, jobInfo);
      if (!updatedJobDetails) {
         return res.status(400).json({
            status: "Fail",
            message: "With this manager, No Job Data found!",
         });
      }

      res.status(500).json({
         status: "Success",
         message: "successfully updated the job details with ease",
         data: updatedJobDetails,
      });
   } catch (error) {
      res.status(500).json({
         status: "Failed",
         error: error.message,
      });
   }
};
