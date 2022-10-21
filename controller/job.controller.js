const Company = require("../model/Company.model");
const Application = require("../model/Application.model");
const Job = require("../model/Job.model");
const User = require("../model/User.model");

exports.getAllJobs = async (req, res) => {
   try {
      //{price:{$ gt:50}
      //{ price: { gt: '50' } }

      let filters = { ...req.query };

      //sort , page , limit -> exclude
      const excludeFields = ["sort", "page", "limit"];
      excludeFields.forEach((field) => delete filters[field]);

      //gt ,lt ,gte .lte
      let filtersString = JSON.stringify(filters);
      filtersString = filtersString.replace(/\b(gt|gte|lt|lte|ne|eq)\b/g, (match) => `$${match}`);

      filters = JSON.parse(filtersString);

      const queries = {};

      if (req.query.sort) {
         // price,qunatity   -> 'price quantity'
         const sortBy = req.query.sort.split(",").join(" ");
         queries.sortBy = sortBy;
      }

      if (req.query.fields) {
         const fields = req.query.fields.split(",").join(" ");
         queries.fields = fields;
      }

      if (req.query.page) {
         const { page = 1, limit = 10 } = req.query; // "3" "10"

         const skip = (page - 1) * parseInt(limit);
         queries.skip = skip;
         queries.limit = parseInt(limit);
      }

      const jobs = await getAllJobsService(filters, queries);

      res.status(200).json({
         status: "success",
         data: jobs,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         message: "can't get the data",
         error: error.message,
      });
   }
};

exports.createJob = async (req, res, next) => {
   try {
      //check user token to find manager's company id. if it doesnt match with req.body.companyInfo then return
      const { email } = req.user;
      const manager = await User.findOne({ email });

      //get the company in which this manager is assigned
      const company = await Company.findOne({ managerName: manager._id });

      const { companyInfo } = req.body;
      if (company._id.toString() !== companyInfo.toString()) {
         return res.status(400).json({
            status: "fail",
            message: "You are not authorized to create job for this company",
         });
      }

      // deadline must be atleast 1 day from now otherwise return
      //deadline formate 2022-01-01
      const { deadline } = req.body;
      const today = new Date();
      const deadlineDate = new Date(deadline);
      if (deadlineDate < today) {
         return res.status(400).json({
            status: "fail",
            message: "Deadline must be atleast 1 day from now",
         });
      }

      // save or create
      const result = await createJobService(req.body);

      res.status(200).json({
         status: "success",
         message: "Job created successfully!",
         data: result,
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         message: " Data is not inserted ",
         error: error.message,
      });
   }
};

exports.getJobsByManagerToken = async (req, res) => {
   try {
      const { email } = req.user;
      //get user by this email from User model
      const user = await User.findOne({ email }).select("-password -__v -createdAt -updatedAt -role -status -appliedJobs");
      //get company by this user from Company model inside managerName field
      const company = await Company.findOne({ managerName: user._id });

      //get all jobs
      const jobs = await Job.find({}).select("-applications").populate({
         path: "companyInfo",
         select: "-jobPosts",
      });
      //find the jobs by company id
      const jobsByCompany = jobs.filter((job) => {
         return job.companyInfo._id.toString() == company._id.toString();
      });

      res.status(200).json({
         status: "success",
         data: {
            managerInfo: user,
            jobs: jobsByCompany,
         },
      });
   } catch (error) {
      res.status(400).json({
         status: "fail",
         message: "can't get the data",
         error: error.message,
      });
   }
};
