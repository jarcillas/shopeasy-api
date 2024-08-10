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

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const { name } = req.body;

  // check that id exists
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    console.log('results:', results.rows);
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send('User does not exist in the database.');
      return;
    }

    // update user's name with given id
    pool.query(queries.updateUserName, [id, name], (error, results) => {
      if (error) throw error;
      res.status(200).send('User updated successfully.');
      console.log('User updated successfully.');
    });
  });
};

const removeUser = (req, res) => {
  const id = parseInt(req.params.id);

  // check that id exists
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    console.log('results:', results.rows);
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send('User does not exist in the database.');
      return;
    }

    // delete user with given id
    pool.query(queries.removeUser, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send('User deleted successfully.');
      console.log('User deleted successfully.');
    });
  });
};

// shoplists

const getShoplistsByUserId = (req, res) => {
  const id = parseInt(req.params.id);

  // check if user exists
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    console.log('results:', results.rows);
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send('User does not exist in the database.');
      return;
    }

    // get shoplists of user
    pool.query(queries.getShoplistsByUserId, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  });
};

const getShoplist = (req, res) => {
  const { userId, shoplistId } = req.params;

  // check if user exists
  pool.query(queries.getUserById, [userId], (error, results) => {
    if (error) throw error;
    console.log('results:', results.rows);
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send('User does not exist in the database.');
      return;
    }

    // get shoplist of user if it exists
    pool.query(queries.getShoplist, [userId, shoplistId], (error, results) => {
      if (error) throw error;
      const noShoplistFound = !results.rows.length;
      if (noShoplistFound) {
        res.send('User does not have the given shoplist.');
        return;
      }
      res.status(200).json(results.rows);
    });
  });
};

const addShoplistToUser = (req, res) => {
  const id = parseInt(req.params.id);

  const { title, status } = req.body;

  // check if user exists
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    console.log('results:', results.rows);
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send('User does not exist in the database.');
      return;
    }

    // add shoplist to user
    pool.query(
      queries.addShoplistToUser,
      [title, status, id],
      (error, results) => {
        if (error) throw error;
        res.status(201).send('Shoplist created successfully.');
        console.log('Shoplist created successfully.');
      }
    );
  });
};

const updateShoplist = (req, res) => {
  const { userId, shoplistId } = req.params;

  const { title, status } = req.body;

  // check if user exists
  pool.query(queries.getUserById, [userId], (error, results) => {
    if (error) throw error;
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send('User does not exist in the database.');
      return;
    }

    // get shoplist of user if it exists
    pool.query(queries.getShoplist, [userId, shoplistId], (error, results) => {
      if (error) throw error;
      const noShoplistFound = !results.rows.length;
      if (noShoplistFound) {
        res.send('User does not have the given shoplist.');
        return;
      }

      // update shoplist
      pool.query(
        queries.updateShoplist,
        [userId, shoplistId, title, status],
        (error, results) => {
          if (error) throw error;
          res.status(201).send('Shoplist updated successfully.');
        }
      );
    });
  });
};

const deleteShoplist = (req, res) => {
  const { userId, shoplistId } = req.params;

  // check if user exists
  pool.query(queries.getUserById, [userId], (error, results) => {
    if (error) throw error;
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      res.send('User does not exist in the database.');
      return;
    }

    // get shoplist of user if it exists
    pool.query(queries.getShoplist, [userId, shoplistId], (error, results) => {
      if (error) throw error;
      const noShoplistFound = !results.rows.length;
      if (noShoplistFound) {
        res.send('User does not have the given shoplist.');
        return;
      }

      // delete shoplist
      pool.query(
        queries.deleteShoplist,
        [userId, shoplistId],
        (error, results) => {
          if (error) throw error;
          res.status(200).send('Shoplist deleted successfully.');
        }
      );
    });
  });
};

module.exports = {
  root,
  getUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
  getShoplistsByUserId,
  getShoplist,
  addShoplistToUser,
  updateShoplist,
  deleteShoplist,
};
