const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");

describe("Server path: /videos", () => {
    describe("POST", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("returns created success status response code", async () => {
            const videoToCreate = {
                title: "Sample title",
                description: "Sample description"
            };

            const response = await request(app)
                .post("/videos")
                .type("form")
                .send(videoToCreate);

            assert.equal(response.status, 201);
        });

        it("stores new video in the database", async () => {
            const videoToCreateDb = {
                title: "Sample title db",
                description: "Sample description db"
            };

            const response = await request(app)
                .post("/videos")
                .type("form")
                .send(videoToCreateDb);

            const createdVideo = await Video.findOne(videoToCreateDb);

            assert.equal(createdVideo.title, videoToCreateDb.title);
            assert.equal(createdVideo.description, videoToCreateDb.description);
        });
    });
});
