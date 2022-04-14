const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/registration", (req, res) => {
    res.render("registration");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/news", (req, res) => {
    res.render("news");
});

router.get("/forum", (req, res) => {
    res.render("forum");
});



module.exports = router;

