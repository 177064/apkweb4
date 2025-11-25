"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
app.get("/math/circle/:r", (req, res) => {
  const radius = parseFloat(req.params.r);

  if (isNaN(radius) || radius <= 0) {
    return res.status(400).json({ error: "Invalid radius" });
  }

  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;

  const result = {
    area: area.toFixed(2),
    circumference: circumference.toFixed(2),
  };

  res.json(result);
});

app.get("/math/rectangle/:width/:height", (req, res) => {
  const w = parseFloat(req.params.width);
  const h = parseFloat(req.params.height);
  if (isNaN(w) || w <= 0) {
    return res.status(400).json({ error: "Invalid width" });
  }

  if (isNaN(h) || h <= 0) {
    return res.status(400).json({ error: "Invalid height" });
  }
  
  let area = w * h;
  let circumference = 2 * (w + h);

  if (!Number.isInteger(area)) {
    area = Number(area.toFixed(2));
  }

  if (!Number.isInteger(circumference)) {
    circumference = Number(circumference.toFixed(2));
  }

  
  const result = {
    area: area,
    circumference: circumference,
  };

  res.json(result);
});

//TODO3

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
