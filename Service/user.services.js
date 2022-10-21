const UserModel = require("../model/User.model");

exports.signupService = async (userInfo) => {
   const user = await UserModel.create(userInfo);
   return user;
};
