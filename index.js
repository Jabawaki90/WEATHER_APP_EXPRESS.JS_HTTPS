const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const appid = "2817402e78d2acfc632ec5499fa566df";
const rootURL = "https://api.openweathermap.org/data/2.5/";
const tempUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=kuala lumpur&appid=2817402e78d2acfc632ec5499fa566df&units=metric";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body.city);
  let query = req.body.city;
  https.get(
    `${rootURL}weather?q=${query}&appid=${appid}&units=metric`,
    (response) => {
      response.on("data", (data) => {
        const datas = JSON.parse(data);
        const icon = datas.weather[0].icon;
        console.log(icon);
        const temp = datas.main.temp;
        const desc = datas.weather[0].description;
        const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        res.set("Content-Type", "text/html");
        res.write("<h2>Weather condition is " + desc + "</h2>");
        res.write(
          "<h1>Temperature in " + query + " is : " + temp + " celcius</h1>"
        );
        res.write(`<img src='${imgURL}'/>`);
        res.send();
      });
    }
  );
});

// app.get("/", (req, res) => {

// });

app.listen(1000, () => console.log("server start at port 1000"));
