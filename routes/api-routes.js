const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/login", function (req, res) {
    db.users.findOne({
        where: {
            email: req.body.username
        }
    }).then(function (response, error) {
        if (error) {
            res.json(error)
        }
        if (!response || !response.password || req.body.password != response.password) {
            res.json({success:false})
        } else {
            res.json({success:true})
        }
    })
});

router.post("/api/dashboard", function (req, res) {
    db.loans.findAll({
        where: {
            [db.Sequelize.Op.or]: [{lender: req.body.activeUser}, {borrower: req.body.activeUser}]
        }
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
            res.json({success:true})
        }
    })
});

// router.get("/api/loans", function (req, res) {
//     db.loans.findAll({}).then(function (response, error) {
//         if (error) {
//             res.json(error)
//         }
//         res.json(response)
//     })
// });

router.get("/api/loans/:id", function (req, res) {
    db.loans.findOne({
        where: {
            id: req.params.id
        },
        // include: [db.Products]
    }).then(function (dbPost) {
        res.json(dbPost);
    }).catch(function (error) {
        res.json({ error: error });
    });
});

router.post("/api/loans", function (req, res) {
    db.loans.create(req.body).then(function (response, error) {
        if (error) {
            res.json(error)
        }
        res.json(req.body)
    })
});

module.exports = router;