const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const app = express();

//routes
const userRoute = require("./routes/user.route");
const adminRoute = require("./routes/admin.route");
const generalRoute = require("./routes/general.route");
const candidateRoute = require("./routes/candidate.route");
const hiringManagerRoute = require("./routes/hiringManager.route");

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

app.get("/", (req, res) => {
   res.send("Welcome to the job management system api");
});

// for invalid route will fix later
app.use("*", (req, res) => {
   res.send("Go to the exact location like - /api/user");
});

app.listen(port, () => {
   console.log(`The port is connected to ${port}`);
});
