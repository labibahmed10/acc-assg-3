const mongoose = require("mongoose");
const Company = require("../model/Company.model");


exports.getCompaniesService = async (filters, queries) => {
  const companies = await Company.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy)
    .populate({
      path: "managerName",
      select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
    });

  const total = await Company.countDocuments(filters);
  const page = Math.ceil(total / queries.limit) || 1;

  return { total, count: companies.length, page, companies };
};