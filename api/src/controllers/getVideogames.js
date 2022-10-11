require("dotenv").config();
const URL = "https://api.rawg.io/api";
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogame, Genre } = require("../db.js");

exports.getVideogames = async (req, res) => {
    const { name } = req.query;
    let allVideoGames = [];
    let gamesDBFull = [];
    let gamesDB = [];
    let nextUrl = URL;
    let findedVideoGames = [];

    try {
        if (name) {
            gamesDB = await Videogame.findAll({
                where: { name: name },
                include: [Genre],
            });

            console.log(gamesDB);
            if (gamesDB.length > 0) {
                gamesDBFull = gamesDB.map((g) => ({
                    id: g.dataValues.id,
                    name: g.dataValues.name,
                    img: g.dataValues.img,
                    platforms: g.platforms,
                    genres: g.dataValues.genres
                        .map((g) => g.name)
                        .filter((p) => p != null)
                        .join(", "),
                }));
            }

            const { data } = await axios.get(
                `${URL}/games?key=${API_KEY}&search=${name}`
            );

            findedVideoGames = data.results.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    img: game.background_image,
                    platforms:
                        game.parent_platforms &&
                        game.parent_platforms
                            .map((p) => p.platform.name)
                            .filter((p) => p != null)
                            .join(", "),
                    genres:
                        game.genres &&
                        game.genres
                            .map((g) => g.name)
                            .filter((g) => g != null)
                            .join(", "),
                };
            });

            findedVideoGames = gamesDBFull.concat(findedVideoGames);

            if (findedVideoGames.length > 0)
                return res.status(200).json(findedVideoGames.slice(0, 15));
            else {
                return res.status(200).json("No games");
            }
        }

        for (let i = 1; i < 6; i++) {
            const { data } = await axios.get(
                `${nextUrl}/games?key=${API_KEY}&page=${i}`
            );

            nextUrl = data.next;

            const videoGame = data.results.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    img: game.background_image,
                    platforms:
                        game.parent_platforms &&
                        game.parent_platforms
                            .map((p) => p.platform.name)
                            .filter((p) => p != null)
                            .join(", "),
                    genres:
                        game.genres &&
                        game.genres
                            .map((g) => g.name)
                            .filter((g) => g != null)
                            .join(", "),
                    rating: game.rating,
                };
            });
            allVideoGames = allVideoGames.concat(videoGame);
        }

        gamesDB = await Videogame.findAll({ include: [Genre] });
        gamesDBFull = gamesDB.map((g) => ({
            id: g.dataValues.id,
            name: g.dataValues.name,
            img: g.dataValues.img,
            platforms: g.platforms,
            genres: g.dataValues.genres
                .map((g) => g.name)
                .filter((p) => p != null)
                .join(", "),
        }));
        allVideoGames = allVideoGames.concat(gamesDBFull);

        return res.status(200).json(allVideoGames);
    } catch (error) {
        return res.status(400).send(error);
    }
};
