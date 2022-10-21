const Company = require("../model/Company.model");
const Application = require("../model/Application.model");
const Job = require("../model/Job.model");
const User = require("../model/User.model");

exports.getJobsService = async (filters, queries) => {
   const jobs = await Job.find(filters).skip(queries.skip).limit(queries.limit).select(queries.fields).sort(queries.sortBy).populate({
      path: "managerName",
      select: "-password -__v -createdAt -updatedAt -role -status",
   });

   const total = await Job.countDocuments(filters);
   const page = Math.ceil(total / queries.limit) || 1;

   return { total, count: jobs.length, page, jobs };
};
