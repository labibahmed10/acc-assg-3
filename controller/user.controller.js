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
