const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const apiRoutes = require("./routes/api-routes.js");
const htmlRoutes = require("./routes/html-routes.js");

app.use(apiRoutes);
app.use(htmlRoutes);

db.sequelize.sync({}).then(function () {
    app.listen(PORT, function () {
        console.log("Listening on PORT " + PORT);
    });
});
