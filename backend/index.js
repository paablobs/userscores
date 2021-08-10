const express = require("express");
const app = express();
const port = 3000;
const userscoresController = require("./controllers/userscores.controller");
const { initialPlayerCreation, createScores } = require("./utils/Utils");

app.get("/getScores", async (req, res) => {
  await userscoresController.getBestScores(req, res);
});

app.listen(port, async () => {
  await initialPlayerCreation();
  await createScores();
  setInterval(() => {
    createScores();
  }, 300000);
});
