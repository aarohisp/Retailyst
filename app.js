const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.URL);

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/administrator.html",function(req,res){
    res.sendFile(__dirname + "/administrator.html");
});

app.get("/store.html",function(req,res){
    res.sendFile(__dirname + "/store.html");
});

app.get("/screen3.html",function(req,res){
    res.sendFile(__dirname + "/screen3.html");
});

const administratorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Administrator = mongoose.model("Administrator", administratorSchema);

app.post("/administratorSignup",function(req,res){
    // console.log(req.body);
    const administrator = new Administrator({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    administrator.save();
    res.redirect("/screen3.html");
});

app.post("/administratorLogin",function(req,res){
    // console.log(req.body);
    Administrator.findOne({email: req.body.email})
    .then(
        (doc) => {
            // console.log(doc);
            if (req.body.password === doc.password)
            {
                res.redirect("/screen3.html");
            }
        })
    .catch(
        (err) => {
            console.log(err);
        });
})

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Store = mongoose.model("Store", storeSchema);

app.post("/storeSignup",function(req,res){
    // console.log(req.body);
    const store = new Store({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    store.save();
    res.redirect("/screen3.html");
});

app.post("/storeLogin",function(req,res){
    // console.log(req.body);
    Store.findOne({email: req.body.email})
    .then(
        (doc) => {
            // console.log(doc);
            if (req.body.password === doc.password)
            {
                res.redirect("/screen3.html");
            }
        })
    .catch(
        (err) => {
            console.log(err);
        });
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});