require("dotenv").config();
const express = require("express");
const app = express();
const homeroute = require("./routes/index")
const pagesroutes = require("./routes/pages");
const ejs = require("ejs");
const PORT = process.env.PORT;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(homeroute);
app.use(pagesroutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})