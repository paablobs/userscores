const playerModel = require("./player.model");

module.exports = (sequelize, Sequelize) => {
  const Userscores = sequelize.define("userscores", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: Sequelize.DATE,
    },
    score: {
      type: Sequelize.INTEGER,
    },
  });
  const Player = playerModel(sequelize, Sequelize);
  Userscores.belongsTo(Player);
  Player.hasOne(Userscores);
  return Userscores;
};
