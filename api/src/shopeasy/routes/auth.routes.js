const { authJWT } = require('../middleware');
const {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
} = require('../controllers/user.controller');

/**
 *
 * @param {import('express').Router} router
 */

module.exports = (router) => {
  router.get('/api/test/all', [authJWT.verifyToken], allAccess);
  router.get('/api/test/user', [authJWT.verifyToken], userBoard);
  router.get(
    '/api/test/moderator',
    [authJWT.verifyToken, authJWT.isModerator],
    moderatorBoard
  );
  router.get(
    '/api/test/admin',
    [authJWT.verifyToken, authJWT.isAdmin],
    adminBoard
  );
};
