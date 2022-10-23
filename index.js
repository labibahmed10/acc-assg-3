const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//routes
const userRoute = require("./Routes/user.route");
const adminRoute = require("./Routes/admin.route");
const generalRoute = require("./Routes/general.route");
const candidateRoute = require("./Routes/candidate.route");
const hiringManagerRoute = require("./Routes/hiringManager.route");

// middlewares
app.use(cors());
app.use(express.json());

// database connection here
require("./server");

// declaration of routes
app.use("/api/", generalRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/", candidateRoute);
app.use("/api/", hiringManagerRoute);

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
