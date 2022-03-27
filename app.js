const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send(__dirname + "/view/index.html");
})



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})