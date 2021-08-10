const conn = require("../models");
const axios = require("axios");

async function createPlayer() {
  const response = await axios.get("https://randomuser.me/api");
  try {
    if (response.data) {
      const result = response.data.results[0];
      const player = await conn.player.create({
        nickname: result.login.username,
        picture: result.picture.medium,
      });
      return player.toJSON();
    }
  } catch (error) {
    return { error: error.message };
  }
}

async function initialPlayerCreation() {
  const playerCount = await conn.player.count();
  if (playerCount < 10) {
    for (let index = 0; index < 10; index++) {
      await createPlayer();
    }
  }
}

async function createScores() {
  const playerList = await conn.player.findAll();
  let userStat = [];
  for (const player of playerList) {
    const score = Math.floor(Math.random() * 100) + 0;
    userStat.push(
      conn.userscores.create({
        playerId: player.get("id"),
        createdAt: new Date(),
        score: score,
      })
    );
  }
  const createdStats = await Promise.all(userStat);
  const result = { results: createdStats.map((stat) => stat.toJSON()) };
  return result;
}

async function getBestScores() {
  const scoreOrderedList = await conn.userscores.findAll({
    order: [["score", "DESC"]],
    limit: 10,
    include: conn.player,
  });

  const scoreList = scoreOrderedList.map((stat) => stat.toJSON());
  return scoreList;
}

exports.initialPlayerCreation = initialPlayerCreation;
exports.createScores = createScores;
exports.getBestScores = getBestScores;
exports.createPlayer = createPlayer;
