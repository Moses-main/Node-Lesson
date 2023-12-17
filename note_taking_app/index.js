const axios = require("axios");
const { urlencoded, json } = require("body-parser");
const express = require("express");
const app = express();
const port = 3500;
const path = require("path");
// const user = users.find((user) => user.name === "Moses");
const url =
  "http://api.weatherapi.com/v1/current.json?key=bcd9930a6155480dafb10640231412&q=London&aqi=no";
// nst axios = require('axios');

// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = process.env.API_KEY;
const apiUrl = `https://api.weatherprovider.com/forecast?apiKey=${apiKey}&location=yourLocation`;
app.use(urlencoded(json));
// axios
//   .get(apiUrl)
//   .then((response) => {
//     // Handle the data received from the API
//     console.log(response.data);
//     // console.log("fetched data successfully");
//   })
//   .catch((error) => {
//     // Handle any errors from the API call
//     console.error("Error fetching weather data:", error);
//   });

app.use(express.static(path.join(__dirname, "../public")));

// LET THE URL BE HERE
app.get("/", (req, res) => {
  res.send("Hello express");
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Nigeria",
  });
});

app.listen(port, () => console.log("listening on port " + port));
