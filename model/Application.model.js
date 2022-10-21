const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// schema design
const applicationSchema = mongoose.Schema(
   {
      job: {
         type: ObjectId,
         required: true,
         ref: "Job",
      },
      applicant: {
         type: ObjectId,
         required: true,
         ref: "User",
      },
      resume: {
         type: String,
      },
   },
   {
      timestamps: true,
   },
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
