const { Router } = require('express');

const { getUsers } = require('./controller');

const router = Router();

router.get('/', getUsers);

router.get('/list', (req, res) => {
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

module.exports = router;
