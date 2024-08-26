const { Router } = require('express');

const controller = require('./controller');

const router = Router();

router.get('/', controller.root);

router.get('/users', controller.getUsers);

router.get('/users/:id', controller.getUserById);

router.post('/users', controller.addUser);

router.put('/users/:id', controller.updateUser);

router.delete('/users/:id', controller.removeUser);

router.get('/users/:id/shoplists', controller.getShoplistsByUserId);

// router.get('/users/:userId/shoplist/:shoplistId', controller.getShoplist);

// router.post('/users/:id/shoplists', controller.addShoplistToUser);

// router.put('/users/:userId/shoplist/:shoplistId', controller.updateShoplist);

// router.delete('/users/:userId/shoplist/:shoplistId', controller.deleteShoplist);

// router.get('/item/:id', controller.getItemById);

// router.get('/shoplist/:id/items', controller.getShoplistItems);

module.exports = router;
