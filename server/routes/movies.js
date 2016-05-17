var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/zcher82';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM movies', function (err, result) {
      done();

      console.log(result.rows);

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var movie = req.body;
  console.log(movie);
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO movies (title, year, genre, director, favorite, main_actor) ' +
                  'VALUES ($1, $2, $3, $4, $5, $6)',
                   [movie.title, movie.year, movie.genre, movie.director, movie.favorite, movie.main_actor],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
  });
});

module.exports = router;
