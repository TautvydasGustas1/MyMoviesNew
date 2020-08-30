const express = require("express");
const router = express.Router();
const config = require("config");
const bcrypt = require("bcryptjs");
const request = require("request");
//const { check, validationResult } = require('express-validator'); // Maybe will be needed in the future

// @route   GET api/movies/trending/movies
// @desc    Get trending movies
// @acess   Public
// Maybe in the future change to POST?
router.get("/trending/movies", async (req, res) => {
  try {
    const page = req.query.page;

    const options = {
      uri: `https://api.themoviedb.org/3/trending/movie/day?api_key=${config.get(
        "MOVIES_API_KEY"
      )}&page=${page}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    //Request of trending movies
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No movies found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/movies/popular/movies
// @desc    Get popular movies
// @acess   Public
// Maybe in the future change to POST?
router.get("/popular/movies", async (req, res) => {
  try {
    const page = req.query.page;

    const options = {
      uri: `https://api.themoviedb.org/3/movie/popular?api_key=${config.get(
        "MOVIES_API_KEY"
      )}&page=${page}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    //Request of popular movies
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No movies found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/movies/movie/:id
// @desc    Get movie details
// @acess   Public
// Maybe in the future change to POST?
router.get("/movie/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let append_to_res = "";
    if (req.query.append_to_response) {
      append_to_res = "&append_to_response=" + req.query.append_to_response;
    }

    const options = {
      uri: `https://api.themoviedb.org/3/movie/${id}?api_key=${config.get(
        "MOVIES_API_KEY"
      )}${append_to_res}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    //Request of trending movies
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No movie found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/movies/search
// @desc    Get movie details
// @acess   Public
// Maybe in the future change to POST?
router.get("/search", async (req, res) => {
  try {
    const options = {
      uri:
        `https://api.themoviedb.org/3/search/movie?api_key=${config.get(
          "MOVIES_API_KEY"
        )}&query=` +
        req.query.searchQuery +
        "&page=" +
        req.query.page,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    //Search for movies
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "Not Found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
