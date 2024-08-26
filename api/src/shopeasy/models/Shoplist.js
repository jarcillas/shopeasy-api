/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */

const createShoplistModel = (sequelize, DataTypes) => {
  const Shoplist = sequelize.define(
    'Shoplist',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM('planned', 'done', 'canceled'),
      },
    },
    {
      tableName: 'shoplists',
    }
  );

  return Shoplist;
};

module.exports = createShoplistModel;
