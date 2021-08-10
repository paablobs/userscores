const { getBestScores } = require("../utils/Utils");

exports.getBestScores = async (req, res) => {
  const scoreList = await getBestScores();
  res.send(scoreList);
};
