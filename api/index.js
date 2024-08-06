const express = require('express');

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
