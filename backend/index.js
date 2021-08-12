const express = require("express");
const app = express();
const port = 3000;
const userscoresController = require("./controllers/userscores.controller");
const { initialPlayerCreation, createScores } = require("./utils/Utils");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/getScores", async (req, res) => {
  await userscoresController.getBestScores(req, res);
});

app.listen(port, async () => {
  setTimeout(async () => {
    await initialPlayerCreation();
    await createScores();
  }, 10000);
  setInterval(() => {
    createScores();
  }, 300000);
});
