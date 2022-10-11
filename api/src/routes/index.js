const { Router } = require("express");
const { addVideoGame } = require("../controllers/addVideoGame");
const { deleteVideoGame } = require("../controllers/deleteVideoGame");
const { getGenres } = require("../controllers/getGenres");
const { getVideogameById } = require("../controllers/getVideogameById");
const { getVideogames } = require("../controllers/getVideogames");
const { updateVideoGame } = require("../controllers/patchVideoGame");

const router = Router();

router.get("/videogames", getVideogames);
router.get("/videogame/:id", getVideogameById);
router.get("/genres", getGenres);
router.post("/videogames", addVideoGame);
router.delete("/videogame/:id", deleteVideoGame);
router.patch("/videogame", updateVideoGame);

module.exports = router;
