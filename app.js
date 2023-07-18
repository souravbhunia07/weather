const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apikey = "01d0363db004279751ca41e76806a65b";
  const units = "metric";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    units;
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      // Soft UI style for the HTML response
      res.write(
        "<!DOCTYPE html>" +
        "<html lang='en' dir='ltr'>" +
        "<head>" +
        "  <meta charset='utf-8'>" +
        "  <title>Weather Report</title>" +
        "  <style>" +
        "    body {" +
        "      font-family: Arial, sans-serif;" +
        "      background-color: #f7f7f7;" +
        "      display: flex;" +
        "      justify-content: center;" +
        "      align-items: center;" +
        "      height: 100vh;" +
        "      margin: 0;" +
        "    }" +
        "    .weather-card {" +
        "      background-color: #fff;" +
        "      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);" +
        "      border-radius: 8px;" +
        "      padding: 20px;" +
        "      display: flex;" +
        "      flex-direction: column;" +
        "      align-items: center;" +
        "    }" +
        "    h1 {" +
        "      font-size: 28px;" +
        "      margin-bottom: 16px;" +
        "      color: #555;" +
        "    }" +
        "    p {" +
        "      font-size: 16px;" +
        "      margin-bottom: 8px;" +
        "      color: #666;" +
        "    }" +
        "    img {" +
        "      width: 100px;" +
        "      height: 100px;" +
        "      margin-top: 16px;" +
        "      border-radius: 50%;" +
        "      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" +
        "    }" +
        "  </style>" +
        "</head>" +
        "<body>" +
        "  <div class='weather-card'>" +
        "    <h1>The temperature in " +
        query +
        " is " +
        temp +
        " degrees Celsius.</h1>" +
        "    <p>The weather description in " +
        query +
        " is " +
        weatherDescription +
        ".</p>" +
        "    <img src=" +
        imageURL +
        ">" +
        "  </div>" +
        "</body>" +
        "</html>"
      );

      res.end();
    });
  });
});

app.listen(3000, function () {
  console.log("server is running at port 3000!");
});
