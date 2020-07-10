// routes/movie.routes.js

const express = require("express");
const router = express.Router();

// **** require Movie model in order to use it ****
const Movie = require("../models/Movie.model");

// Instância do Multer
const fileUploader = require("../configs/cloudinary.config");

// GET route to display all the movies
router.get("/movies", (req, res) => {
  Movie.find()
    .then((moviesFromDB) => {
      console.log(moviesFromDB);
      res.render("movies/movies-list", { movies: moviesFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
});

// GET route to display the form to create a new movie
router.get("/movies/create", (req, res) => res.render("movies/movie-create"));

// Criar documento no banco e fazer upload da imagem
router.post("/movies/create", fileUploader.single("image"), (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;

  Movie.create({ title, description, imageUrl: req.file.url })
    .then((data) => {
      console.log(data);
      res.redirect("/movies");
    })
    .catch((error) =>
      console.log(`Error while creating a new movie: ${error}`)
    );
});

module.exports = router;
