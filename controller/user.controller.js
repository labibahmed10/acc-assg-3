const service = require("../service/user.service");
const { generateToken } = require("../utils/token");

exports.signUp = async (req, res) => {
   try {
      const userInfo = req.body;
      const userExist = await service.userExist(userInfo.email);

      if (userExist) {
         return res.status(400).json({ 
            status: "Failed", 
            error: "User already Exist with the same email"
         });
      }

      const user = await service.signUpService(userInfo);
      const { password,appliedJobs,__v,imageURL, ...others } = user.toObject();
      res.status(400).json({ 
            status: "Success", 
            message: "User signed up successfully", 
            data: others
         });
         
   } catch (error) {
      res.status(500).json({ 
            status: "Failed", 
            error: error.message 
         });
   }
};

exports.singIn = async (req, res) => {
   try {

      const { email, password } = req.body;
      if (!email | !password) {
         return res.status(401).json({
            status: "fail",
            error: "Please provide email and password",
         });
      }

      const user = await service.signInService(email);
      if (!user) {
         return res.status(400).json({ 
            status: "Failed", 
            error: "User not found!" 
         });
      }

      if (!user.status === "active") {
         return res.status(401).json({
            status: "fail",
            error: "User account isn't active. Please contact support.",
         });
      }

      const correctPass = user.comparePass(password, user.password);
      if (!correctPass) {
         return res.status(400).json({
            status: "Failed", 
            error: "User credentials is wrong" 
         });
      }

      const { password:a,__v, ...others } = user.toObject();
      const token = generateToken(user);

      res.status(200).json({
         status: "success",
         message: "User signed up successfully",
         data: others,
         token
      });
   } catch (error) {
      res.status(500).json({ 
         status: "Failed", 
         error: error.message 
      });
   }
};

exports.me = async (req, res) => {
   try {
      const user = await service.userExist(req.user?.email);
      if (!user) {
         return res.status(200).json({ 
            status: "Failed", 
            error: "User not found!" 
         });
      }

      const { password,__v, ...others } = user.toObject();
      res.status(200).json({ 
         status: "Success", 
         message: "User Verified", 
         data: others
      });
   } catch (error) {
      res.status(500).json({ 
         status: "Failed", 
         error: error.message 
      });
   }
};
