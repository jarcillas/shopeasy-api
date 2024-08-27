const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { sequelize, Role, User } = require('./src/shopeasy/db');

const initialize = () => {
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'moderator',
  });

  Role.create({
    id: 3,
    name: 'admin',
  });

  const salt = bcrypt.genSaltSync(12);

  const createUser = (userObj, roles) => {
    User.create(userObj).then((user) => {
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles);
        });
      } else {
        user.setRoles([1]);
      }
    });
  };

  createUser(
    {
      username: 'test_user',
      name: 'User',
      email: 'user@shopeasy.com',
      hashedPassword: bcrypt.hashSync('ezpz_lemonSqueezy', salt),
      salt,
    },
    ['user']
  );

  createUser(
    {
      username: 'test_moderator',
      name: 'Moderator',
      email: 'moderator@shopeasy.com',
      hashedPassword: bcrypt.hashSync('ezpz_lemonSqueezy', salt),
      salt,
    },
    ['moderator']
  );

  createUser(
    {
      username: 'test_admin',
      name: 'Admin',
      email: 'admin@shopeasy.com',
      hashedPassword: bcrypt.hashSync('ezpz_lemonSqueezy', salt),
      salt,
    },
    ['admin']
  );
};

// Authenticate database connection

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize
      .sync({ force: true }) // Use `force: false` to prevent dropping existing tables
      .then(() => {
        console.log('Database & tables synced!');
        initialize();
      })
      .catch((err) => {
        console.error('Unable to sync database:', err);
      });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const shopeasyRoutes = require('./src/shopeasy/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1/shopeasy', shopeasyRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

// Export the Express API
module.exports = app;
