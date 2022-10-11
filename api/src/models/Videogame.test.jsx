const { Videogame, conn } = require("../../src/db.js");

describe("Videogame model", () => {
    let connection;

    beforeAll(async () => {
        connection = await conn.authenticate().catch((err) => {
            console.error("Unable to connect to the database:", err);
        });
    });

    describe("Validators", () => {
        beforeEach(() => Videogame.sync({ force: false }));
        describe("name", () => {
            it("should throw an error if name is null", async () => {
                await Videogame.create({}).catch(function (err) {
                    expect(err["name"]).toEqual("SequelizeValidationError");
                });
            });
        });
        describe("description", () => {
            it("should throw an error if description is null", async () => {
                await Videogame.create({ name: "Witcher" }).catch(function (
                    err
                ) {
                    expect(err["name"]).toEqual("SequelizeValidationError");
                });
            });
        });
    });
});
