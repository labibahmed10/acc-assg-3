const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Welcome to the job management system api");
});

//routes
const userRoute = require("./routes/user.route");


// declaration of user,company,admin routes
app.use("/api/v1/user", userRoute);

// for invalid route will fix later
app.use("*", (req, res) => {
   res.send("Go to the exact location");
});

module.exports = app;
