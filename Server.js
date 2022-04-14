require("dotenv").config();
const express = require("express");
const app = express();
const homeroute = require("./routes/index")
const pagesroutes = require("./routes/pages");
const loginResistration = require("./routes/loginResistration");
const ejs = require("ejs");
const { body, validationResult, check} = require("express-validator");
const bodyParser = require("body-parser");
const PORT = process.env.PORT;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))

app.use(homeroute);
app.use(pagesroutes);
app.use(loginResistration);

app.post("/login", 
[
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({min: 8}).withMessage("required: 8 chars"),
]
,(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        // return res.status(422).send(error.array());
        res.render("login", {alert: error.array()});
    }
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})