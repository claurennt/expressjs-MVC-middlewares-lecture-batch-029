const db = require("../database/client");

const get_all_movies = async (req, res, next) => {
  // const { rows: movies }
  try {
    const { rows } = await db.query("SELECT * from Movies;");
    return res.status(200).send(rows);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const get_movie_by_id = async (req, res, next) => {
  const { id } = req.params;

  try {
    //prepared statement to avoid SQL injections
    const {
      rows: [movie],
      rowCount,
    } = await db.query(`SELECT * FROM Movies WHERE id=$1;`, []);

    //if there is no movie with the id, return 404
    if (!rowCount)
      return res.status(404).send(`The movie with id ${id} does not exist`);

    return res.status(200).send(movie);
  } catch (err) {
    console.log(err);

    next(err);
  }
};

const create_new_movie = async (req, res, next) => {
  const { title, director, year } = req.body;

  //block request if the payload is missing a required field
  if (!title || !director || !year)
    return res
      .status(400)
      .send("The request body must have values for title, director,year");

  try {
    const {
      rows: [createdMovie],
    } = await db.query(
      "INSERT INTO Movies (title,director,year) VALUES ($1,$2,$3) RETURNING *",
      [title, director, year]
    );

    return res.status(201).send(createdMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const update_entire_movie = async (req, res, next) => {
  const { id } = req.params;

  const { title, director, year } = req.body;

  //block request if the payload is missing a required field
  if (!title || !director || !year)
    return res
      .status(400)
      .send("Please provide values for title, director, year");

  try {
    const {
      rowCount,
      rows: [updatedMovie],
    } = await db.query(
      "UPDATE Movies SET title=$1,director=$2,year=$3 WHERE id=$4 RETURNING *",
      [title, director, year, id]
    );

    // inform the user if they try to update a movie that does not exist
    if (!rowCount)
      return res
        .status(404)
        .send(
          `The movie with id ${id} that you are trying to update does not exist`
        );

    return res.status(201).send(updatedMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const delete_movie_by_id = async (req, res, next) => {
  const { id } = req.params;

  try {
    const {
      rows: [deletedMovie],
      rowCount,
    } = await db.query("DELETE FROM Movies WHERE id=$1 RETURNING *", [id]);

    // inform the user if they try to delete a movie that does not exist
    if (!rowCount)
      return res
        .status(404)
        .send(
          `The movie with id ${id} that you are trying to delete does not exist`
        );

    return res.status(200).send(deletedMovie);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  get_all_movies,
  create_new_movie,
  get_movie_by_id,
  update_entire_movie,
  delete_movie_by_id,
};
