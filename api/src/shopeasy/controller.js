const pool = require('../../db');

const queries = require('./queries');

const root = (req, res) => {
  res.send('Welcome to the ShopEasy API');
};

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUser = (req, res) => {
  const { name, email, age, dob } = req.body;

  // check that email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send('Email already exists.');
      return;
    }

    // add user to db
    pool.query(queries.addUser, [name, email, age, dob], (error, results) => {
      if (error) throw error;
      res.status(201).send('User created successfully.');
      console.log('User created successfully.');
    });
  });
};

module.exports = { root, getUsers, getUserById, addUser };
