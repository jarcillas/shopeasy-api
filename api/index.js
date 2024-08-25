const express = require('express');
const { sequelize } = require('./db');

// Authenticate database connection

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize
      .sync({ force: true }) // Use `force: false` to prevent dropping existing tables
      .then(() => {
        console.log('Database & tables synced!');
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
