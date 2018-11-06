const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/index.html"));
})

router.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/signup.html"));
})

router.get("/dashboard", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/dashboard.html"));
})

router.get("/create", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/create.html"));
})

module.exports = router;
