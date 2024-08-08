const { Router } = require('express');

const controller = require('./controller');

const router = Router();

router.get('/', controller.root);

router.get('/users', controller.getUsers);

router.get('/users/:id', controller.getUserById);

router.post('/users', controller.addUser);

router.put('/users/:id', controller.updateUser);

router.delete('/users/:id', controller.removeUser);

router.get('/users/:id/shoplist', controller.getShoplistsByUserId);

router.get('/users/:userId/shoplist/:shoplistId', controller.getShoplist);

router.post('/users/:id/shoplist', controller.addShoplistToUser);

// router.put('/users/:id/shoplist/:slid', controller.updateShoplist);

module.exports = router;
