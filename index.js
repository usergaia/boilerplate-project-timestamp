// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res, next) => {
  let input = req.params.date;
  let date;

  if (/^\d+$/.test(input)) {
    // handle unix digit input
    date =
      input.length === 10
        ? new Date(Number(input) * 1000)
        : new Date(Number(input));
  } else {
    // handle date string input
    date = new Date(input);
  }

  console.log(date);
  if (!isNaN(date.getTime())) {
    res.json({
      unix: Date.parse(date),
      utc: date.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

app.get("/api", (req, res, next) => {
  res.json({
    unix: Number(new Date().getTime()),
    utc: new Date().toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
