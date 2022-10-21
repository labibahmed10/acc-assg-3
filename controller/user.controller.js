const { findUserByEmail } = require("../Service/user.services");
const { signupService } = require("../services/user.service");
const { sendMailWithGmail } = require("../utils/email");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res) => {
   try {
      if (req.body.role === "Admin") {
         return res.status(403).json({
            status: "fail",
            error: "You are not allowed to create admin account. Please contact the admin",
         });
      }
      if (req.body.role === "Hiring-Manager") {
         return res.status(403).json({
            status: "fail",
            error: "You are not allowed to create hiring manager account. Please contact the admin",
         });
      }

      if (req.body.status === "active") {
         return res.status(403).json({
            status: "fail",
            error: "Please don't provide status. It will be automatically set to inactive. You will be able to activate your account by clicking the link sent to your email",
         });
      }

      if (req.body.status === "blocked") {
         return res.status(403).json({
            status: "fail",
            error: "You cannot create a blocked account.",
         });
      }

      const user = await signupService(req.body);

      const token = user.generateConfirmationToken();

      await user.save({ validateBeforeSave: false });

      const mailData = {
         to: [user.email],
         subject: "Verify your Account",
         text: `Thank you for creating your account. Please confirm your account here: ${req.protocol}://${req.get("host")}${
            req.originalUrl
         }/confirmation/${token}`,
      };

      await sendMailWithGmail(mailData);

      res.status(200).json({
         status: "success",
         message: "Successfully signed up",
      });
   } catch (error) {
      res.status(500).json({
         status: "fail",
         error,
      });
   }
};

exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(401).json({
            status: "fail",
            error: "Please provide your credentials",
         });
      }

      const user = await findUserByEmail(email);
      if (!user) {
         return res.status(401).json({
            status: "fail",
            error: "No user found. Please create an account",
         });
      }

      const isPasswordValid = user.comparePassword(password, user.password);

      if (!isPasswordValid) {
         return res.status(403).json({
            status: "fail",
            error: "Password is not correct",
         });
      }

      if (user.status != "active") {
         return res.status(401).json({
            status: "fail",
            error: "Your account is not active yet.",
         });
      }

      const { password: pwd, ...others } = user.toObject();
      const token = generateToken(others);

      res.status(200).json({
         status: "success",
         message: "Successfully logged in",
         data: {
            user: others,
            token,
         },
      });
   } catch (error) {
      res.status(500).json({
         status: "fail",
         error: error.message,
      });
   }
};
