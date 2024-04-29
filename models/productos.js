const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
    idProducto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productNameUrl: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    fotoProducto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    nombreProducto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    descripcionProducto: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    descripcionLargaProducto: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    categoriaProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descuentoProducto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    porcentajeDescuentoProducto: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: true
    },
    soMinimoProducto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    procesadorMinimoProducto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    memoriaMinimoProducto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    graficosMinimoProducto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    hardwareRecomendadoProducto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    steamProducto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    ubisoftProducto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    switchProducto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    xboxProducto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    ps4Producto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    ps5Producto: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    soRecomendadoProducto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    procesadorRecomendadoProducto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    memoriaRecomendadoProducto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    graficosRecomendadoProducto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    videoProducto: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    starsProducto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20
    }
  }, {
    sequelize,
    tableName: 'productos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProducto" },
        ]
      },
    ]
  });
};
