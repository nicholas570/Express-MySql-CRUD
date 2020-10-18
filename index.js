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

app.get('/api/employees/:id', (req, res) => {
  const idEmployee = req.params.id;
  connection.query(
    `SELECT * FROM employee WHERE id = ${idEmployee}`,
    (err, result) => {
      if (err) {
        console.log(err);
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

app.get('/api/movies/:id', (req, res) => {
  const idMovie = req.params.id;
  connection.query(
    `SELECT name FROM movie WHERE id = ${idMovie}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Something went wrong');
      } else {
        res.json(result);
      }
    }
  );
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
app.post('/api/movies', (req, res) => {
  const formData = req.body;

  connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
    if (err) {
      res.status(500).send('Something went wrong');
    } else {
      res.sendStatus(200);
    }
  });
});

// PUT ROUTES

// EMPLOYEE
app.put('/api/employees/:id', (req, res) => {
  const formData = req.body;
  const { id } = req.params;

  connection.query(
    'UPDATE employee SET ? WHERE id = ?',
    [formData, id],
    (err) => {
      if (err) {
        res.status(500).send('Do it again');
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// MOVIE
app.put('/api/movies/:id', (req, res) => {
  const formData = req.body;
  const idEmployee = req.params.id;

  connection.query(
    'UPDATE movie SET ? WHERE id = ?',
    [formData, idEmployee],
    (err) => {
      if (err) {
        res.status(500).send('Error');
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// DELETE ROUTES

// EMPLOYEE
app.delete('/api/employees/:id', (req, res) => {
  const idEmployee = req.params.id;

  connection.query('DELETE FROM employee WHERE id = ?', [idEmployee], (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression');
    } else {
      res.sendStatus(200);
    }
  });
});

// MOVIE
app.delete('/api/movies/:id', (req, res) => {
  const idMovie = req.params.id;

  connection.query('DELETE FROM movie WHERE id = ?', [idMovie], (err) => {
    if (err) {
      res.status(500).send('Erreu lors da la suppression du film');
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
