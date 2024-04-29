const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos', {
    idPedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuarioPedido: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    precioTotal: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPedido" },
        ]
      },
    ]
  });
};
