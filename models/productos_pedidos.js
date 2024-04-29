const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos_pedidos', {
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'productos',
        key: 'idProducto'
      }
    },
    idPedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'pedidos',
        key: 'idPedido'
      }
    },
    cantidadProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaPedido: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productos_pedidos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProducto" },
          { name: "idPedido" },
        ]
      },
      {
        name: "fk_idPedido_idx",
        using: "BTREE",
        fields: [
          { name: "idPedido" },
        ]
      },
    ]
  });
};
