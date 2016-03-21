var Sequelize = require("sequelize");
var sequelize = new Sequelize('asyncdrink', null, null, {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});