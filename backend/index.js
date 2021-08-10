const express = require("express");
const app = express();
const port = 3000;
const userscoresController = require("./controllers/userscores.controller");
const { initialPlayerCreation, createScores } = require("./utils/Utils");

app.get("/getScores", async (req, res) => {
  await userscoresController.getBestScores(req, res);
});

app.get("/", async (req, res) => {
  await initialPlayerCreation();
  await createScores();
  res.send("Everything Ok");
});

app.listen(port, async () => {
  setInterval(() => {
    createScores();
  }, 300000);
});
