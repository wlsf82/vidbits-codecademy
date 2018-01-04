const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");
const { parseTextFromHTML } = require("../test-utils");

describe("Server path: /videos", () => {
    describe("POST", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("returns created success status code", async () => {
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

        it("does not save video when title is missing", async () => {
            const videoToCreateWithMissingTitle = { description: "Sample description db" };

            const response = await request(app)
                .post("/videos")
                .type("form")
                .send(videoToCreateWithMissingTitle);

            const videos = await Video.find({});

            assert.equal(videos.length, 0);
        });

        it("returns '400' status code when title is missing", async () => {
            const videoToCreateWithMissingTitle = { description: "Sample description db" };

            const response = await request(app)
                .post("/videos")
                .type("form")
                .send(videoToCreateWithMissingTitle);

            assert.equal(response.status, 400);
        });

        it("renders the create video form when title is missing", async () => {
            const videoToCreateWithMissingTitle = { description: "Sample description db" };

            const response = await request(app)
                .post("/videos")
                .type("form")
                .send(videoToCreateWithMissingTitle);

            assert.isOk(parseTextFromHTML(response.text, "#create-video-container form"), "Create form was not rendered");
            assert.equal(parseTextFromHTML(response.text, "#create-video-container h2"), "Save a video");
        });
    });
});
