const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

// schema design
const companySchema = mongoose.Schema(
   {
      companyName: {
         type: String,
         required: [true, "Please provide a name for the company"],
         trim: true,
         unique: [true, "Company must be unique"],
         lowercase: true,
         minLength: [3, "Title must be at least 3 characters."],
         maxLenght: [100, "Title is too large"],
      },
      managerName: {
         type: ObjectId,
         unique: true,
         ref: "UserModel",
      },

      location: {
         type: String,
         required: true,
         trim: true,
      },

      companyWebsite: {
         type: String,
         required: [true, "Please provide a company website."],
         validate: [validator.isURL, "Please provide a valid company url"],
      },
      
      jobPosts: [
         {
            type: ObjectId,
            ref: "JobModel",
         },
      ],
   },
   {
      timestamps: true,
   },
);

const CompanyModel = mongoose.model("CompanyModel", companySchema);

module.exports = CompanyModel;
