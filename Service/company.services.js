const CompanyModel = require("../model/Company.model");

exports.getCompaniesService = async (filters, queries) => {
   const companies = await CompanyModel.find(filters).skip(queries.skip).limit(queries.limit).select(queries.fields).sort(queries.sortBy).populate({
      path: "managerName",
      select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
   });

   const total = await CompanyModel.countDocuments(filters);
   const page = Math.ceil(total / queries.limit) || 1;

   return { total, count: companies.length, page, companies };
};

exports.createCompanyService = async (data) => {
   const company = await CompanyModel.create(data);
   //send result with populated with managerName
   const result = await CompanyModel.findOne({ _id: company._id }).populate({
      path: "managerName",
      select: "-password -__v -createdAt -updatedAt -role -status",
   });
   return result;
};

exports.getCompanyByIdService = async (id) => {
   const company = await CompanyModel.findOne({ _id: id })
      // populate managerName without password
      .populate({
         path: "managerName",
         select: "-password -__v -createdAt -updatedAt -role -status -appliedJobs",
      })
      .populate({
         path: "jobPosts",
         select: "-applications",
      });

   return company;
};
