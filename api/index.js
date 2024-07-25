const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    grocerylist: [
      { name: 'Coke', amount: 2, unit: 'L', note: 'For the party' },
      {
        name: 'Purefoods Corned Beef 80g',
        amount: 2,
        unit: 'cans',
        note: 'For breakfast',
      },
    ],
  });
});

app.listen(5000, () => {
  console.log('Running on port 5000.');
});

// Export the Express API
module.exports = app;
