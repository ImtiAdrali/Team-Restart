const express = require("express");
const router = express.Router();
const firbaseApp = require("../public/js/firebase.config")
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } = require("firebase/auth");
const mongoose = require("mongoose");
// const { Schema } = mongoose;


mongoose.connect("mongodb://localhost:27017/disscussionDb");


// Schema
const fourm = new mongoose.Schema({
    title: String,
    date: Date,
    content: String,
    userID: String
});

const disscussionModel = mongoose.model('fourm', fourm);



// Firbase variables 
const auth = getAuth();
let logedin = false;
let currentUser;
router.get("/", (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            logedin = true;
            currentUser = user.uid;
            res.render("index", {logedin});

        }else {
            res.render("index", {logedin});
        }

    })
});



router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            currentUser = userCredential.uid;
            logedin = true;
            res.render("index", {logedin})
        })
        .catch((error) => {
            console.log(error);
    });
})

router.get("/registration", (req, res) => {
    res.render("registration");
});

router.post("/registration", (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // updateProfile(auth.currentUser, {displayName: username})
            if (userCredential.displayName === null)
                userCredential.displayName = username;
            currentUser = userCredential.uid;
            res.redirect("/")
        })
        .catch((error) => {
            console.log("An error has occured");
        });
});

router.get("/about", (req, res) => {
    res.render("about", {logedin});
});

router.get("/contact", (req, res) => {
    res.render("contact", {logedin});
});




router.get("/create", (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            logedin = true;
            currentUser = user.uid;
            res.render("disscussionForm");
            // return 
        }else {
           res.redirect("/login")
        //    return 
        }

    })
});

// News routes start here


const axios = require("axios");
const cheerio = require("cheerio");

let articles = [];

// https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html

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
    res.render("news", {articlesArray: articles, logedin});
})

router.get("/news/:link", (req, res) => {
    const newsArticleLink = req.params.link;
    
    articles.forEach(article => {
        if (article.Title === newsArticleLink) {
            res.render("new-article", { Title: article.Title, Content: article.Content});
            
        }
    });
});


// Fourm ruotes start here
let current = "hello";
router.get("/forum", (req, res) => {
    // console.log(auth.currentUser.email);
    disscussionModel.find({}, (error, foundDisscussion) => {
        if (!error) {
            
            // console.log(currentUser);
            // res.render("forum", {disscussion: foundDisscussion, logedin, current});
            if (logedin == true) {
                current = auth.currentUser.uid;
                res.render("forum", {disscussion: foundDisscussion, logedin, current});
            }
            res.render("forum", {disscussion: foundDisscussion, logedin, current});
            
            // onAuthStateChanged(auth, (user) => {
            //     if (user) {
            //         logedin = true;
            //         currentUser = user.uid;
            //         // console.log(currentUser);
            //         res.render("forum", {disscussion: foundDisscussion, logedin, currentUser} )
            //     }
            // })
            
        }
    })
    // console.log(userid);
    
    
    // if (logedin == true) {
    //     const userid = auth.currentUser.uid;
    //     disscussionModel.findById(userid, (error, foundid) => {
    //         if(!error) {
    //             console.log(foundid);
    //         }
    // })
    // }
    
});

router.post("/forum", (req, res) => {
    const newPost = new disscussionModel({
        title: req.body.title,
        date: new Date().toLocaleDateString(),
        content: req.body.discription,
        userID: current
    });
    // disscussionArray.push(newPost);
    // console.log(auth.currentUser.uid);
    newPost.save((error) => {
        if (!error) {
            console.log("Post saved");
            // res.redirect("/forum");
            // res.render("forum", {disscussion: foundDisscussion, logedin, current} )
            res.redirect("/forum");
        }else {
            console.log("Unable to save the post");
        }
    })
    
});

router.get("/deletePost", (req, res) => {
    disscussionModel.findOneAndRemove({userID: current}, (error, founded) => {
        if (!error) {
            console.log("Deleted");
            res.redirect('/forum')
        }else {
            console.log("Unable to delete the post");
        }
    })
    
})


router.get("/logout", (req, res) => {
    signOut(auth).then(() => {
        logedin = false;
        current = "";
        res.redirect("/")
    }).catch((error) => {
        console.log("Unable to logut");
    })
})


module.exports = router;

