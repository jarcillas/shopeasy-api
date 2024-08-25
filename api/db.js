require('dotenv').config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
});

const User = require('./src/shopeasy/models/User')(sequelize, DataTypes);
const Shoplist = require('./src/shopeasy/models/Shoplist')(
  sequelize,
  DataTypes
);
const Item = require('./src/shopeasy/models/Item')(sequelize, DataTypes);

User.hasMany(Shoplist);

Shoplist.hasMany(Item);

module.exports = {
  sequelize,
  User,
  Shoplist,
  Item,
};
