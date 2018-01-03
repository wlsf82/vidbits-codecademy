const { assert } = require("chai");

describe("User visits the landing page", () => {
    describe("With no existing videos", () => {
        it("video container element is empty", () => {
            browser.url("/");

            assert.equal(browser.getText("#videos-container"), "");
        });
    });

    describe("Navigate to create page", () => {
        it("renders a page to save a video", () => {
            browser.url("/");

            browser.click("a[href='create.html']");

            assert.equal(browser.getText("#create-video-container h2"), "Save a video");
        })
    });
});
