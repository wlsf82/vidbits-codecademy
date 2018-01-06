const { assert } = require("chai");
const { mongoose, databaseUrl, options } = require("../../database");

const { connectDatabase, disconnectDatabase } = require("../database-utilities");

const Video = require("../../models/video");

describe("Model: Video", () => {
    beforeEach(connectDatabase);

    afterEach(disconnectDatabase);

    describe("title", () => {
        it("is a String", () => {
            const titleAsInt = 1;

            const video = new Video({ title: titleAsInt });

            assert.strictEqual(video.title, titleAsInt.toString());
        });
    });

    describe("description", () => {
        it("is a String", () => {
            const descriptionAsInt = 1;

            const video = new Video({ description: descriptionAsInt });

            assert.strictEqual(video.description, descriptionAsInt.toString());
        });
    });

    describe("url", () => {
        it("is a String", () => {
            const urlAsInt = 1;

            const video = new Video({ url: urlAsInt });

            assert.strictEqual(video.url, urlAsInt.toString());
        });
    });
});
