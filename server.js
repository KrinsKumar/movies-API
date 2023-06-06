/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Krinskumar Vaghasia Student ID: 169722212 Date: 23rd May 2023
*  Cyclic Link: https://zany-plum-lobster-shoe.cyclic.app
*
********************************************************************************/ 

const express = require('express');
const app = express();
const env = require('dotenv').config();
const cors = require('cors');

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


app.use(cors());
app.use(express.json());

const HTTP_PORT = process.env.PORT || 8080;

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body)
    .then((msg) => {
        res.json({message: req.body});
    }).catch((err) => {
        res.status(500).json({message: err});
    });
})

app.get("/api/movies", (req, res) => {
    let title = null;
    if (req.query.title) 
    title = req.query.title;

    db.getAllMovies(req.query.page, req.query.perPage, title)
    .then((movies) => {
        res.status(201).json({message: movies});
    }).catch((err) => {
        res.status(500).json({message: err});
    })
});

app.get("/api/movies/:id", (req, res) => {
    db.getMovieById(req.params.id)
    .then((movie) => {
        res.status(201).json({message: movie});
    }).catch((err) => {
        res.status(500).json({message: err});
    })
});

app.put("api/movies/:id", (req, res) => {
    db.updateMovieById(req.body, req.params.id)
    .then((msg) => {
        res.status(201).json({message: "success"});
    }).catch((err) => {
        res.status(500).json({message: "error"});
    })
});

app.delete("api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id)
    .then((msg) => {
        res.status(201).json({message: "success"});
    }).catch((err) => {
        res.status(500).json({message: "error"});    
    })
});


db.initialize("mongodb+srv://krinskumar2:OkHkqARe4FKeivO1@atlascluster.9qnqpt2.mongodb.net/sample_mflix").then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});