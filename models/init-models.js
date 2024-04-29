var DataTypes = require("sequelize").DataTypes;
var _pedidos = require("./pedidos");
var _productos = require("./productos");
var _productos_estrellas = require("./productos_estrellas");
var _productos_pedidos = require("./productos_pedidos");

function initModels(sequelize) {
  var pedidos = _pedidos(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var productos_estrellas = _productos_estrellas(sequelize, DataTypes);
  var productos_pedidos = _productos_pedidos(sequelize, DataTypes);

  pedidos.belongsToMany(productos, { as: 'idProducto_productos', through: productos_pedidos, foreignKey: "idPedido", otherKey: "idProducto" });
  productos.belongsToMany(pedidos, { as: 'idPedido_pedidos', through: productos_pedidos, foreignKey: "idProducto", otherKey: "idPedido" });
  productos_pedidos.belongsTo(pedidos, { as: "idPedido_pedido", foreignKey: "idPedido"});
  pedidos.hasMany(productos_pedidos, { as: "productos_pedidos", foreignKey: "idPedido"});
  productos_estrellas.belongsTo(productos, { as: "idProducto_producto", foreignKey: "idProducto"});
  productos.hasOne(productos_estrellas, { as: "productos_estrella", foreignKey: "idProducto"});
  productos_pedidos.belongsTo(productos, { as: "idProducto_producto", foreignKey: "idProducto"});
  productos.hasMany(productos_pedidos, { as: "productos_pedidos", foreignKey: "idProducto"});

  return {
    pedidos,
    productos,
    productos_estrellas,
    productos_pedidos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
