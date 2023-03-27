const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const apiKey = process.env.API_KEY;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

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

    const articleData = response.data.articles;
    res.render("headlines", {
      articleData,
      numHeadlines,
      country,
      getCountryName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching headlines");
  }
});

function getCountryName(countryCode) {
  const countries = {
    us: "United States",
    ca: "Canada",
    gb: "United Kingdom",
    au: "Australia",
  };

  return countries[countryCode] || countryCode;
}

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
