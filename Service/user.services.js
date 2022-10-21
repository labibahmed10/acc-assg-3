const UserModel = require("../model/User.model");

exports.signupService = async (userInfo) => {
   const user = await UserModel.create(userInfo);
   return user;
};

exports.findUserByEmail = async (email) => {
   return await UserModel.findOne({ email });
};

exports.findUserByToken = async (token) => {
   return await UserModel.findOne({ confirmationToken: token });
};

