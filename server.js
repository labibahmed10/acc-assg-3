const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

const app = require("./index");

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@cluster0.zqp7w.mongodb.net/ACC_3`;

mongoose.connect(uri).then(() => {
   console.log("Successfully connected to database");
});

app.listen(port, () => {
   console.log(`The port is connected to ${port}`);
});
