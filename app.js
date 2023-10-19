const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', async function(){
    console.log("Server up")
})

var ansSchema = new mongoose.Schema({

    empid: { type: String, },
    q1: { type: String, },
    q2: { type: String },
    q3: { type: String },
    q4: { type: String },
    q5: { type: String },
    q6: { type: String, },
    q7: { type: String },
    q8: { type: String },
    q9: { type: String },
    q10: { type: String },
    q11: { type: String },
    q12: { type: String, },
    q13: { type: String },
    q14: { type: String },
    q15: { type: String },
    q16: { type: String },
    q17: { type: String },
    q18: { type: String, },
    q19: { type: String },
    q20: { type: String },
    q21: { type: String },
    q22: { type: String },
    q23: { type: String },
    q24: { type: String, },
    q25: { type: String },
    q26: { type: String },
    q27: { type: String },
    q28: { type: String },
    q29: { type: String },
    q30: { type: String },
    q31: { type: String },
    q32: { type: String },
    q33: { type: String },
    q34: { type: String },
    q35: { type: String },
    q36: { type: String },
    q37: { type: String },
    q38: { type: String },
    q39: { type: String },
    q40: { type: String },
    q41: { type: String },
    gender: { type: String },
    years: { type: String },
    age: { type: String },
    location: { type: String },
    unit: { type: String },
    level: { type: String },
});

var Ans = mongoose.model("Ans", ansSchema);

app.get("/", function (req, res) {
    res.render("index", { redirect: "/consent?" + req.url.split("?")[1] });
});

app.get("/consent", function (req, res) {
    const link = req.url.split("?")[1];
    res.render("consent", { sonataForm: "/sonataForm?" + link, parityForm:"/parityForm?" + link, accept: "/survey?" + link, decline: "/thanks?" + link });
});

app.get("/survey", function (req, res) {
    res.render("survey", { postRoute: "/submit?" + req.url.split("?")[1] });
});

app.get("/thanks", function (req, res) {
    res.render("thanks", {note: "We appreciate your decision"})
});

app.get("/sonataForm", function (req, res) {
    res.render("sonataForm", { backToSurvey: "/consent?" + req.url.split("?")[1] });
});

app.get("/parityForm", function(req, res) {
    res.render("parityForm", { backToSurvey: "/consent?" + req.url.split("?")[1] });
})

// app.get("/indexnext", function (req, res) {
//     res.render("consent");
// });

// app.get("/tnc", function(req, res) {
//     res.render("survey")
// })

// app.get("/cnt", function(req, res) {
//     res.send("ok")
// })

// app.get("/thank", function (req, res) {
//     res.render("thank", {note: "We appreciate your decision"});
//     // function redirectD() { 
//     // setTimeout(()=>{res.redirect("/")}, 3000)
//     // }
//     //   redirectD();
// });

app.post("/submit", async function (req, res) {

    const ans = new Ans({
        empid: req.url.split("?")[1],
        q1: req.body.section1question1option,
        q2: req.body.section1question2option,
        q3: req.body.section1question3option,
        q4: req.body.section1question4option,
        q5: req.body.section1question5option,
        q6: req.body.section1question6option,
        q7: req.body.section1question7option,

        q8: req.body.section2question1option,
        q9: req.body.section2question2option,
        q10: req.body.section2question3option,
        q11: req.body.section2question4option,
        q12: req.body.section2question5option,
        q13: req.body.section2question6option,
        q14: req.body.section2question7option,
        q15: req.body.section2question8option,

        q16: req.body.section3question1option,
        q17: req.body.section3question2option,
        q18: req.body.section3question3option,
        q19: req.body.section3question4option,
        q20: req.body.section3question5option,
        q21: req.body.section3question6option,
        q22: req.body.section3question7option,

        q23: req.body.section4question1option,
        q24: req.body.section4question2option,
        q25: req.body.section4question3ption,
        q26: req.body.section4question4option,
        q27: req.body.section4question5option,
        q28: req.body.section4question6option,
        q29: req.body.section4question7option,

        q30: req.body.section5question1option,
        q31: req.body.section5question2option,
        q32: req.body.section5question3option,
        q33: req.body.section5question4option,
        q34: req.body.section5question5option,
        q35: req.body.section5question6option,
        q36: req.body.section5question7option,

        q37: req.body.section6question1option,
        q38: req.body.section6question2option,
        q39: req.body.section6question3option,
        q40: req.body.section6question4option,
        q41: req.body.section6question5option,

        gender: req.body.section7question1option,
        years: req.body.section7question2option,
        age: req.body.section7question3option,
        location: req.body.section7question4option,
        unit: req.body.section7question5option,
        level: req.body.section7question6option,

    });
    await ans.save();
    res.render("thanks", {note: "Thank you for taking part in this Employee Inclusion Survey! Your input will drive positive change as we work towards a more inclusive workplace. Your voice matters. <br> -Sonata DEI Council"});
});


app.listen("3000", () => {
    console.log("xd")
})