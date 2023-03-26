const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

const apiKey = process.env.API_KEY;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/headlines", async (req, res) => {
  try {
    const { numHeadlines, country } = req.query;
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        apiKey: apiKey,
        language: "en",
        pageSize: numHeadlines,
        country,
      },
    });
    console.log(response.data.articles);
    const articleData = response.data.articles;
    res.render("headlines", { articleData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching headlines");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
