const Job = require("../model/Job");
const Candidate = require("../model/Candidate");

exports.getAllJobsService = async (filter, sort) => {
   const jobs = await Job.find(filter).select("-postedBy").sort(sort);
   return jobs;
};

exports.getJobService = async (jobId) => {
   const job = await Job.findById(jobId)
      .populate({
         path: "postedBy.id",
         select: "-appliedJobs -password -__v -status",
      })
      .select("-__v");
   return job;
};

exports.applyJobService = async (jobId, applicantId, resume) => {
   const appliedFor = { jobId, resume };
   const appliedCandidate = { applicantId: applicantId.toString(), resume };

   await Job.findByIdAndUpdate(jobId, { $push: { appliedCandidate }, $inc: { applyCount: 1 } }, { runValidators: true, new: true });
   const apply = await Candidate.findOneAndUpdate({ user: applicantId }, { $push: { appliedFor } }, { runValidators: true, new: true });
   return apply;
};

exports.findJobById = async (jobId) => {
   const job = await Job.findById(jobId);
   return job;
};
