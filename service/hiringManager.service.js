const Job = require("../model/Job");
const User = require("../model/User");
const HiringManager = require("../model/HiringManager");

exports.createJobService = async (jobInfo, manager) => {
   const job = await Job.create(jobInfo);
   const { title, _id } = job;
   const jobPosted = { name: title, _id };

   await HiringManager.findOneAndUpdate({ user: manager?._id }, { $push: { jobPosted } }, { runValidators: true, new: true });
   return job;
};

exports.getJobsService = async (manager) => {
   const jobs = await Job.find({ "postedBy.id": manager.id }).select("-__v -applyCount -appliedCandidate -postedBy");
   return jobs;
};

exports.findUserByEmail = async (email) => {
   const result = await User.findOne({ email }).select("-password -__v -appliedJobs -role -status");
   return result;
};

exports.getJobService = async (jobId, managerId) => {
   const jobs = await Job.findOne({ _id: jobId, "postedBy.id": managerId }).select("-postedBy -_id -__v").populate("appliedCandidate.applicantId");
   return jobs;
};

exports.updateJobService = async (jobId, managerId, jobInfo) => {
   const result = await Job.findOneAndUpdate(
      {
         _id: jobId,
         "postedBy.id": managerId,
      },
      jobInfo,
      { runValidators: true, new: true },
   ).select("-postedBy");
   return result;
};
