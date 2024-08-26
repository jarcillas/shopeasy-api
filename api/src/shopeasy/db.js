const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
});

const User = require('./models/User')(sequelize, DataTypes);
const Role = require('./models/Role')(sequelize, DataTypes);
const Shoplist = require('./models/Shoplist')(sequelize, DataTypes);
const Item = require('./models/Item')(sequelize, DataTypes);

User.hasMany(Shoplist, {
  foreignKey: {
    allowNull: false,
  },
});

User.belongsToMany(Role, {
  through: 'user_roles',
});

Role.belongsToMany(User, {
  through: 'user_roles',
});

Shoplist.hasMany(Item, {
  foreignKey: {
    allowNull: false,
  },
});

const ROLES = ['user', 'moderator', 'admin'];

module.exports = {
  sequelize,
  User,
  Role,
  Shoplist,
  Item,
  ROLES,
};
