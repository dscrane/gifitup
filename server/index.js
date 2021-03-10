const express = require("express");

const app = express();

const PORT = 5500 || process.env.PORT;

app.get("/", (req, res) => {
  console.log("endpoint hit");
  res.send({ resp: "Hello World" });
});

app.listen(PORT, () => {
  console.log("[App]: Listening on port" + PORT);
});
