require("dotenv").config();
const express = require("express");
const app = express();
// const homeroute = require("./routes/index");
const pagesroutes = require("./routes/pages");
// const newsRouter = require("./routes/news");
// const loginResistration = require("./routes/loginResistration");
// const fourm = require("./routes/fourm");
const ejs = require("ejs");
const { body, validationResult, check } = require("express-validator");
const bodyParser = require("body-parser");

const PORT = process.env.PORT_LOCAL;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(homeroute);
app.use(pagesroutes);
// app.use(loginResistration);
// app.use(fourm);
// app.use(newsRouter);

app.post("/login",
    [
        check("email").isEmail().withMessage("Invalid email"),
        check("password").isLength({ min: 8 }).withMessage("required: 8 chars"),
    ]
    , (req, res) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            // return res.status(422).send(error.array());
            res.render("login", { alert: error.array() });
        }
    });


let port = process.env.PORT;
if (port == null || port == "") {
    port = PORT
}

app.listen(port, () => {
    console.log(`Server has started successfully.`);
})
