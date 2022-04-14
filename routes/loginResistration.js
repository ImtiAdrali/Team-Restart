const express = require("express");
const { body, validationResult, check} = require("express-validator");
const router = express.Router();
 





router.post("/registration", 
    [
        check("username").not().isEmpty().withMessage("cant not be empty"),
        check("email").isEmail().withMessage("Invalid email"),
        check("password").isLength({min: 8}).withMessage("required: 8 chars"),
    ]
,(req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).send(error.array());
    }
})

module.exports = router;