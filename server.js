const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
// const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/api-routes.js");
app.use(apiRoutes);

mongoose.connect('mongodb://localhost/iou_db', {
  useNewUrlParser: true
});

app.listen(PORT, function () {
  console.log(`App running on port ${PORT}`);
});
