const sequence = require('sequelize')
const crearConfigBaseDades = () => {
  return new sequence.Sequelize("black_diamond","root", "1234", {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      timestamps: false,
      freezeTableName: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  })
}
module.exports = {crearConfigBaseDades}
