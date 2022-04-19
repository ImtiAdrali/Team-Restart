const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

let articles = [];

axios("	https://data.cdc.gov/browse?q=Ability%20to%20handle%20a%20COVID-19%20outbreak%20(CVAC)&sortBy=relevance")
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html);
        
        $(".browse2-result-content").each(function() {
            const title = $(this).find("h2 a").text().replace(/\s\s+/g, "");
            const content = $(this).find(".browse2-result-description").text().replace(/\s\s+/g, "");
            const date = $(this).find(".browse2-result-timestamp-value").text().replace(/\s\s+/g, "")
            
            articles.push({
                Title: title,
                Date: date,
                Content: content
            });
        })
    })
    .catch(err => {
        console.log(err)
    })

router.get("/news", (req, res) => {
    res.render("news", {articlesArray: articles});
})

module.exports = router;