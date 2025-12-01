"use strict";

const express = require("express");
const app = express();

let categories = ["funnyJoke", "lameJoke"];

let funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",
    response: "Bo złapał wirusa!",
  },
  {
    joke: "Dlaczego komputer nie może być głodny?",
    response: "Bo ma pełen dysk!",
  },
  {
    joke: "Co mówi jeden bit do drugiego?",
    response: "„Trzymaj się, zaraz się przestawiamy!”",
  },
];

let lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",
    response: "Bo w nocy jest mniej bugów do łapania!",
  },
  {
    joke: "Jak nazywa się bardzo szybki programista?",
    response: "Błyskawiczny kompilator!",
  },
];

const jokes = { funnyJoke, lameJoke };

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

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = Math.pow(base, exponent);

  const includeRoot = req.query.root === "true";

  if (includeRoot) {
    const root = Math.sqrt(base);
    return res.json({
      result: result,
      root: root,
    });
  }

  res.json({
    result: result,
  });
});

// jokebook categories list
app.get("/jokebook/categories", (req, res) => {
  try {
    if (!Array.isArray(categories)) {
      return res.status(500).json({ error: "Categories list is invalid." });
    }
    res.json({ categories });
  } catch (err) {
    console.error("Error in /jokebook/categories:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// random joke from a specific category
app.get("/jokebook/joke/:category", (req, res) => {
  try {
    const category = req.params.category;

    if (!categories.includes(category)) {
      return res
        .status(400)
        .json({ error: `No jokes for category '${category}'.` });
    }
    //const joke = category[Math.floor(Math.random() * category.length)]["joke"];
    //const response = category[Math.floor(Math.random() * category.length)]["response"];
    const jokeArray = jokes[category];
    const random = Math.floor(Math.random() * jokeArray.length);
    res.json({
      joke: jokeArray[random].joke,
      response: jokeArray[random].response,
    });
  } catch (err) {
    console.error("Error in /jokebook/joke/:category:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// random joke from any category
app.get("/jokebook/random", (req, res) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(500).json({ error: "no jokes available ..." });
  }

  const category = categories[Math.floor(Math.random() * categories.length)];
  //const jokeArray = [];
  const jokeArray = jokes[category];

  if (!Array.isArray(jokeArray) || jokeArray.length === 0) {
    return res
      .status(400)
      .json({ error: `No jokes for category '${category}'.` });
  }

  const random = Math.floor(Math.random() * jokeArray.length);

  res.json({
    category: category,
    joke: jokeArray[random].joke,
    response: jokeArray[random].response,
  });
});

// Endpoint for adding new joke to a specific category
app.post("/jokebook/joke/:category", express.json(), (req, res) => {
  try {
    const category = req.params.category;
    const { joke, response } = req.body;

    if (!joke || !response) {
      return res
        .status(400)
        .json({ error: "Both 'joke' and 'response' are required" });
    }

    if (!categories.includes(category)) {
      return res
        .status(400)
        .json({ error: `no jokes for category '${category}'` });
    }

    const jokeArray = jokes[category];
    jokeArray.push({ joke, response });

    res.status(201).json({
      message: "Joke added successfully",
      category: category,
      joke: joke,
      response: response,
    });
  } catch (err) {
    console.error("Error in /jokebook/joke/:category:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
