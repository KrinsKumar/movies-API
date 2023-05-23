const cors = require('cors');
const express = require('express');
const app = express();
const env = require('dotenv').config();

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


app.use(cors());
app.use(express.json());

const HTTP_PORT = process.env.PORT || 8080;

app.post("/api/movies", (req, res) => {
    db.addNewMovie(req.body)
    .then((msg) => {
        res.json(req.body);
    }).catch((err) => {
        res.status(500).json({message: err});
    });
})

app.get("/api/movies", (req, res) => {
    let title = null;
    if (req.params.title) title = res.params.title;

    db.getAllMovies(req.params.page, req.params.perPage, title)
    .then((movies) => {
        res.status(204).json(movies);
    }).catch((err) => {
        res.status(500).json({message: err});
    })
});

app.get("/api/movies/:id", (req, res) => {
    db.getMovieById(req.params.id)
    .then((movie) => {
        res.status(204).json(movie);
    }).catch((err) => {
        res.status(500).json({message: err});
    })
});

app.put("api/movies/:id", (req, res) => {
    db.updateMovieById(req.body, req.params.id)
    .then((msg) => {
        res.status(204).json("success");
    }).catch((err) => {
        res.status(500).json("error");
    })
});

app.delete("api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id)
    .then((msg) => {
        res.status(204).json("success");
    }).catch((err) => {
        res.status(500).json("error");    
    })
});


db.initialize(process.env.MONGO_CONNECTION_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});