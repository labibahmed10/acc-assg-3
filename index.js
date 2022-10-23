const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");

//routes
const userRoute = require("./Routes/user.route");
const adminRoute = require("./Routes/admin.route");
const generalRoute = require("./Routes/general.route");
const candidateRoute = require("./Routes/candidate.route");
const hiringManagerRoute = require("./Routes/hiringManager.route");

// middlewares
app.use(cors());
app.use(express.json());
dotenv.config();

// declaration of routes
app.use("/api/", generalRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/", candidateRoute);
app.use("/api/", hiringManagerRoute);

// database connection here
require("./server");

// for invalid route will fix later
app.use("*", (req, res) => {
   res.send("Go to the exact location like - /api/user");
});

app.get("/", (req, res) => {
   res.send("Welcome to the job management system api");
});

app.listen(port, () => {
   console.log(`The port is connected to ${port}`);
});
