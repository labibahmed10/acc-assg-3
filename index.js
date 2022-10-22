const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//routes
const userRoute = require("./routes/user.route");
const jobRoute = require("./routes/job.route");
const companyRoute = require("./routes/company.route");

// middlewares
app.use(cors());
app.use(express.json());

// database connection here
require("./server");

// declaration of user,company,admin routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1", jobRoute);
app.use("/api/v1/company", companyRoute);

app.get("/", (req, res) => {
   res.send("Welcome to the job management system api");
});

// for invalid route will fix later
app.use("*", (req, res) => {
   res.send("Go to the exact location");
});

app.listen(port, () => {
   console.log(`The port is connected to ${port}`);
});
