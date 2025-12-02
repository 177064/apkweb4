"use strict";

const express = require("express");
const path = require("path");
const app = express();

// serve static files (html, css, js)
app.use(express.static("."));

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

let jokes = { funnyJoke, lameJoke };

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
