require("dotenv").config();
const URL = "https://api.rawg.io/api";
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre } = require("../db.js");

exports.getGenres = async (req, res) => {
    try {
        const { data } = await axios.get(`${URL}/genres?key=${API_KEY}`);
        data.results.forEach((g) => {
            Genre.findOrCreate({
                where: { name: g.name },
            });
        });
        const genresDB = await Genre.findAll({order: [['name', 'ASC']]});
        res.status(200).json(genresDB);
    } catch (err) {
        res.status(404).json(err);
    }
};
