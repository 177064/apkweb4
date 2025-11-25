"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
app.get("/math/circle/:r", (req, res) => {
  const radius = parseFloat(req.params.r);

  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;

  const result = {
    area: area.toFixed(2),
    circumference: circumference.toFixed(2)
  };

  res.json(result);
});

//TODO2

//TODO3

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
