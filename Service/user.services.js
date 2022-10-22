const UserModel = require("../model/User.model");

exports.signupService = async (userInfo) => {
   const user = await UserModel.create(userInfo);
   return user;
};

exports.findUserByToken = async (token) => {
   return await UserModel.findOne({ confirmationToken: token });
};

exports.findUserByEmail = async (email) => {
   return await UserModel.findOne({ email });
};


exports.allCandidatesService = async () => {
   return await User.find({ role: "Candidate" })
      .select("-password -__v -createdAt -updatedAt ")
      .populate({
         path: "appliedJobs",
         populate: {
            path: "job",
            select: "-applications",
            populate: {
               path: "companyInfo",
               select: "-jobPosts",
               populate: {
                  path: "managerName",
                  select: "-password -__v -createdAt -updatedAt -role -appliedJobs -status ",
               },
            },
         },
         select: "-applicant",
      });
};

exports.candidateByIdService = async (id) => {
   //get user with id and role candidate
   return await User.findOne({ _id: id, role: "Candidate" })
      .select("-password -__v -createdAt -updatedAt ")
      .populate({
         path: "appliedJobs",
         populate: {
            path: "job",
            select: "-applications",
            populate: {
               path: "companyInfo",
               select: "-jobPosts",
               populate: {
                  path: "managerName",
                  select: "-password -__v -createdAt -updatedAt -role -appliedJobs -status ",
               },
            },
         },
         select: "-applicant",
      });
};

exports.allHiringManagersService = async () => {
   return await User.find({ role: "Hiring-Manager" }).select("-password -__v -createdAt -updatedAt -appliedJobs");
};

exports.findUserById = async (id) => {
   // return user info excluding password
   return await User.findOne({ _id: id }).select("-password -__v -createdAt -updatedAt ");
};
