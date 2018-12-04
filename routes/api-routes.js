const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/login", function (req, res) {
    db.users.findOne({
        email: req.body.username
    }).then(function (response, error) {
        if (error) {
           return res.json(error)
        }
        if (!response || !response.password || req.body.password != response.password) {
           return res.json({ success: false })
        } else {
          return res.json({
                success: true,
                name: response.name
            })
        }
    })
});

router.post("/api/dashboard", function (req, res) {
    db.loans.find({
        $or: [{ 'lender': req.body.activeUser }, { 'borrower': req.body.activeUser }]
    }).then(function (response, error) {
        if (error) {
            res.json(error)
        }
        res.json(response)
    })
});

router.post("/api/users", function (req, res) {
    db.users.create(req.body).then(function (response, error) {
        if (error) {
            res.json(error)
        } else {
            res.json({ success: true })
        }
    })
});

router.post("/api/loans", function (req, res) {
    db.loans.create(req.body).then(function (response, error) {
        if (error) {
            res.json(error)
        } else {
            res.json({ success: true })
        }
    })
});

router.get("/api/loans/:id", function (req, res) {
    db.loans.findOne({
        _id: req.params.id
    }).then(function (response, error) {
        if (error) {
            res.json(error)
        }
        res.json(response)
    })
});

router.put("/api/loans", function (req, res) {
    db.loans.update(
        { _id: req.body.loanId },
        {
            status: req.body.status,
            balance: req.body.balance,
            notes2: req.body.notes2,
            authority: req.body.authority
        }
    ).then(function (response, error) {
        if (error) {
            res.json(error)
        } else {
            res.json({ success: true })
        }
    })
});

module.exports = router;