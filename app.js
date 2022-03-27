const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");

const PORT = 5000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("registration")
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})