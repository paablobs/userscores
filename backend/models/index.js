const dbConfig = require("../config/db.config.js");
const mysql = require("mysql2/promise");

const Sequelize = require("sequelize");

const conn = {};

async function initialize() {
  const connection = await mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB};`);

  const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      operatorsAliases: false,

      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    }
  );

  conn.Sequelize = Sequelize;
  conn.sequelize = sequelize;

  conn.player = require("./player.model.js")(sequelize, Sequelize);
  conn.userscores = require("./userscores.model.js")(sequelize, Sequelize);

  await conn.sequelize.sync();
}

module.exports = conn;

initialize().catch((e) => {
  console.log(e);
});
