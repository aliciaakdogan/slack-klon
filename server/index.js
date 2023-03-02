import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("hej");
});

app.listen(3000);
