const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");
const Video = require("../../models/video");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");
const { parseTextFromHTML } = require("../test-utils");

describe("Server path: /", () => {
    describe("GET", () => {
        beforeEach(connectDatabase);

        const videoToCreate = { title: "Title of existing video" };

        beforeEach(async () => {
            await request(app)
                .post("/videos")
                .type("form")
                .send(videoToCreate);
        });

        afterEach(disconnectDatabase);

        it("render existing videos", async () => {
            const response = await request(app).get(`/`);

            assert.include(parseTextFromHTML(response.text, "#videos-container .video-title"), videoToCreate.title);
        });
    });
});
