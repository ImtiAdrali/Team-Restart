const express = require("express");
const router = express.Router();

let disscussionArray = [];

router.get("/forum", (req, res) => {
    res.render("forum", {disscussion: disscussionArray});
});

router.post("/forum", (req, res) => {
    const newPost = {
        title: req.body.title,
        date: new Date(),
        discription: req.body.discription
    }
    disscussionArray.push(newPost);
    res.redirect("/forum");
});

router.get("/create", (req, res) => {
    res.render("disscussionForm");
});

module.exports = router;