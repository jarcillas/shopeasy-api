const { Sequelize, Op } = require('sequelize');
const { User, Role } = require('../db');
const config = require('../config/auth.config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signup = (req, res) => {
  const { username, name, email, password, roles } = req.body;

  const salt = bcrypt.genSaltSync();
  // Save user to db
  User.create({
    username,
    name,
    email,
    salt,
    hashedPassword: bcrypt.hashSync(password, salt),
  })
    .then((user) => {
      if (roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: 'User was registered successfully!' });
            return;
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.send({ message: 'User was registered successfully!' });
          return;
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
};

const signin = (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.hashedPassword);

      if (!passwordIsValid) {
        res
          .status(401)
          .send({ accessToken: null, message: 'Invalid password!' });
        return;
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
        return;
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
      return;
    });
};

module.exports = {
  signup,
  signin,
};
