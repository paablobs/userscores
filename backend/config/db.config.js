module.exports = {
  HOST: "db",
  USER: "root",
  PASSWORD: "root",
  DB: "userscores",
  dialect: "mysql",
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
