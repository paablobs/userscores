const conn = require("../models");
const { getBestScores } = require("../utils/Utils");

exports.getBestScores = async (req, res) => {
  const scoreList = getBestScores();
  res.send(scoreList);
};
