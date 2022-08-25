const express = require("express");
const checkAdminToken = require("../middlewares/checkAdminToken");
const moviesRouter = express.Router();

const {
  get_all_movies,
  create_new_movie,
  get_movie_by_id,
  update_entire_movie,
  delete_movie_by_id,
} = require("../controllers/movies");

moviesRouter
  .route("/")
  .get(get_all_movies)
  .post(checkAdminToken, create_new_movie);

moviesRouter
  .route("/:id")
  .get(get_movie_by_id)
  .put(checkAdminToken, update_entire_movie)
  .delete(checkAdminToken, delete_movie_by_id);

module.exports = moviesRouter;
