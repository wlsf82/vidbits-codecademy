const { assert } = require("chai");
const request = require("supertest");

const app = require("../../app");

describe("Server path: /videos", () => {
    describe("POST", () => {
        it("returns created success status response code", async () => {
            const newVideo ={
                title: "Sample title",
                description: "Sample description"
            };

            const response = await request(app)
                .post("/videos")
                .type("form")
                .send(newVideo);

            assert.equal(response.status, 201);
        });
    });
});
