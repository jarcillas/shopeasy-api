const createItemModel = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
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
      quantity: {
        type: DataTypes.INTEGER,
      },
      unit_price: {
        type: DataTypes.FLOAT,
      },
      unit: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'items',
    }
  );

  return Item;
};

module.exports = createItemModel;
