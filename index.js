const express = require('express');
const app = express();
const connection = require('./conf');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// GET ROUTES

// EMPLOYEE
app.get('/api/employees', (req, res) => {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/employee/:id', (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT lastname, firstname FROM employee WHERE id = ${id}`,
    (err, result) => {
      if (err) {
        res.status(500).send('Something went wrong');
      } else {
        res.json(result);
      }
    }
  );
});

// MOVIE
app.get('/api/movies', (req, res) => {
  connection.query('SELECT * FROM movie', (err, result) => {
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.json(result);
    }
  });
});

app.get('/api/movies/names', (req, res) => {
  connection.query('SELECT name FROM movie', (err, result) => {
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.json(result);
    }
  });
});

// POST ROUTES

// EMPLOYEE
app.post('/api/employees', (req, res) => {
  const formData = req.body;

  connection.query('INSERT INTO employee SET ?', formData, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('OUPS!!!!!!');
    } else {
      res.sendStatus(200);
    }
  });
});

//MOVIE
app.post('/api/movie', (req, res) => {
  const formData = req.body;

  connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, (err) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log(`server listening on port ${port}`);
  }
});
