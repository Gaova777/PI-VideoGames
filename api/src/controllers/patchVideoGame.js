const { Genre, Videogame } = require("../db.js");

exports.updateVideoGame = async (req, res) => {
    const { id, name, description, released, rating, genres, image, platforms } =
        req.body;

    if (!id || !name || !description || !released || !rating || !genres || !image || !platforms) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    let platformString = platforms.join(", ");

    try {
        let game = await Videogame.findByPk(id);

        game.name = name;
        game.description = description;
        game.released = released;
        game.rating = rating;
        game.img = image;
        game.platforms = platformString;

        await game.save();

        let genresGame = [];
        for (const g of genres) {
            genresGame.push(await Genre.findOne({ where: { name: g } }));
        }
        await game.setGenres(genresGame);

        game = {
            ...game.dataValues,
            genres: genres
                .map((g) => g)
                .join(", "),
        };

        return res.status(200).json(game);
    } catch (error) {
        return res.status(404).json(error);
    }
};