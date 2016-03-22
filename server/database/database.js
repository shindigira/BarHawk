var Sequelize = require("sequelize");
var sequelize = new Sequelize('johnchau', null, null, {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});