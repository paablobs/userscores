module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define("player", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: Sequelize.STRING,
    },
    picture: {
      type: Sequelize.STRING,
    },
  });

  return Player;
};
