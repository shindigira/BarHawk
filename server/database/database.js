var Sequelize = require("sequelize");
var sequelize = new Sequelize('barhawk', null, null, {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});