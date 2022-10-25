const User = require("../model/User");
const Candidate = require("../model/Candidate");
const HiringManager = require("../model/HiringManager");

exports.getAllCandidatesService = async () => {
   const candidates = await Candidate.find({})
      .populate({
         path: "user",
         select: "-__v -password -appliedJobs",
      })
      .select("-__v");
   return candidates;
};

exports.getCandidateService = async (id) => {
   const candidate = await Candidate.findById(id).populate("user");
   return candidate;
};

exports.getHiringManagersService = async () => {
   const candidates = await HiringManager.find({}).populate("user");
   return candidates;
};

exports.updateUserService = async (id, role) => {
   const candidates = await User.findByIdAndUpdate(id, role, { runValidators: true });
   return candidates;
};
