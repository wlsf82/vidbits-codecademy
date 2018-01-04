const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");
const { parseTextFromHTML, seedVideoToDatabase } = require("../test-utils");

describe("Server path: /videos", () => {
    describe("GET", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("render existing videos", async () => {
            const video = await seedVideoToDatabase({});

            const response = await request(app).get(`/videos`);

            assert.include(parseTextFromHTML(response.text, "#videos-container .video-title"), video.title);
        });
    });
});
