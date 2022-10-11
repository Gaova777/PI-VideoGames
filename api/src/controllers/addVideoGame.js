const { Genre, Videogame } = require("../db.js");

exports.addVideoGame = async (req, res) => {
    const { name, description, released, rating, genres, image, platforms } =
        req.body;

    if (!name || !description || !released || !rating || !genres || !image || !platforms) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    let platformString = platforms.join(", ");

    try {
        let gameCreated = await Videogame.create({
            name: name,
            description: description,
            img: image,
            released: released,
            rating: rating,
            platforms: platformString,
        });

        for (const g of genres) {
            let genresGame = await Genre.findOne({ where: { name: g } });
            await gameCreated.addGenre(genresGame);
        }

        gameCreated = {
            ...gameCreated.dataValues,
            genres: genres
                .map((g) => g)
                .join(", "),
        };

        return res.status(200).json(gameCreated);
    } catch (error) {
        return res.status(404).json(error);
    }
};
