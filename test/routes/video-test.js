const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");
const { parseTextFromHTML, seedVideoToDatabase  } = require("../test-utils");

describe("Server path: /videos/:id", () => {
    describe("GET", () => {
        beforeEach(connectDatabase);

        afterEach(disconnectDatabase);

        it("render single video", async () => {
            const video = await seedVideoToDatabase({});

            const response = await request(app).get(`/videos/${video._id}`);

            assert.include(parseTextFromHTML(response.text, "#video-container h3"), video.title);
            assert.include(parseTextFromHTML(response.text, "#video-container p"), video.description);
        });
    });
});
