const CompanyModel = require("../model/Company.model");
const ApplicationModel = require("../model/Application.model");
const JobModel = require("../model/Job.model");
const UserModel = require("../model/User.model");

exports.getAllJobsService = async (filters, queries) => {
   const jobs = await JobModel.find(filters)
      .select("-applications")
      .populate({
         path: "companyInfo",
         select: "-jobPosts",
         populate: {
            path: "managerName",
            select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
         },
      })
      .skip(queries.skip)
      .limit(queries.limit)
      .select(queries.fields)
      .sort(queries.sortBy);

   const total = await JobModel.countDocuments(filters);
   const page = Math.ceil(total / queries.limit) || 1;
   return { total, page, jobs };
};

exports.createJobService = async (data) => {
   const job = await JobModel.create(data);
   const result = await JobModel.findOne({ _id: job._id })
      .select("-applications")
      .populate({
         path: "companyInfo",
         select: "-jobPosts",
         populate: {
            path: "managerName",
            select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
         },
      });
   const company = await CompanyModel.findOne({ _id: job.companyInfo._id });
   company.jobPosts.push(job._id);
   await company.save({
      validateBeforeSave: false,
   });
   //push the jobPost in companyInfo's Job post array

   return result;
};

exports.getJobsService = async (filters, queries) => {
   const jobs = await JobModel.find(filters).skip(queries.skip).limit(queries.limit).select(queries.fields).sort(queries.sortBy).populate({
      path: "managerName",
      select: "-password -__v -createdAt -updatedAt -role -status",
   });

   const total = await JobModel.countDocuments(filters);
   const page = Math.ceil(total / queries.limit) || 1;

   return { total, count: jobs.length, page, jobs };
};

exports.getJobByIdService = async (id) => {
   const job = await JobModel.findOne({ _id: id })
      // populate managerName without password
      .populate({
         path: "managerName",
         select: "-password -__v -createdAt -updatedAt -role -status",
      });
   // .populate("suppliledBy.id")
   // .populate("brand.id");
   return job;
};

exports.updateJobService = async (jobId, data) => {
   const result = await JobModel.updateOne(
      { _id: jobId },
      { $set: data },
      {
         runValidators: true,
      },
   );
   return result;
};

exports.getJobByIdService = async (id) => {
   const job = await JobModel.findOne({ _id: id })
      .select("-applications")
      .populate({
         path: "companyInfo",
         select: "-jobPosts",
         populate: {
            path: "managerName",
            select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
         },
      });
   return job;
};

exports.applyJobService = async (jobId, userId, resumeLink) => {
   const job = await JobModel.findOne({ _id: jobId });
   const application = await ApplicationModel.create({
      job: jobId,
      applicant: userId,
      resume: resumeLink,
   });
   job.applications.push(application._id);
   await job.save({
      validateBeforeSave: false,
   });
   //push the application to the appliedJobs array of that user
   const user = await UserModel.findOne({ _id: userId });
   user.appliedJobs.push(application._id);
   await user.save({
      validateBeforeSave: false,
   });
   //return populated application
   const result = await ApplicationModel.findOne({ _id: application._id })
      .populate({
         path: "job",
         select: "-applications",
         populate: {
            path: "companyInfo",
            select: "-jobPosts",
            populate: {
               path: "managerName",
               select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
            },
         },
      })
      .populate({
         path: "applicant",
         select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
      });

   return result;
};

exports.getHighestPaidJobsService = async () => {
   //top 10 highest paid jobs which has not crossed deadline
   const jobs = await JobModel.find({ deadline: { $gte: Date.now() } })
      .sort({ salary: -1 })
      .limit(10)
      .select("-applications")
      .populate({
         path: "companyInfo",
         select: "-jobPosts",
         populate: {
            path: "managerName",
            select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
         },
      });
   return jobs;
};

exports.getMostAppliedJobsService = async () => {
   //top 5 most applied jobs which has not crossed deadline
   const jobs = await JobModel.find({ deadline: { $gte: Date.now() } })
      .sort({ applications: -1 })
      .limit(5)
      .select("-applications")
      .populate({
         path: "companyInfo",
         select: "-jobPosts",
         populate: {
            path: "managerName",
            select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
         },
      });
   return jobs;
};
