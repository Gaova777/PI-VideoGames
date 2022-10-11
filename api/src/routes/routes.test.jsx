const request = require("supertest");
const express = require("express");
const router = require("./index.js");
const app = express();

app.use("/", router);

describe("Testing Routes", function () {
    let res;

    beforeAll(async () => {
        res = await request(app).get("/videogames");
    }, 30000);

    test("responds to /videogames and return a json", () => {
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    });
    test("responds to /videogames and return a status 200", () => {
        expect(res.statusCode).toBe(200);
    });
    test("responds to /videogames and return 100 videogames from api", () => {
        expect(res._body.length).toBeGreaterThan(99);
    });
});
