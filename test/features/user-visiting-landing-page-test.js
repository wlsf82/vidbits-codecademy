const { assert } = require("chai");

const { generateRandomUrl } = require("../test-utils");

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

            browser.click("a[href='/videos/create']");

            assert.equal(browser.getText("#create-video-container h2"), "Save a video");
        })
    });

    describe("With an existing video", () => {
        const title = "Existing video title";
        const url = generateRandomUrl("example.com");

        beforeEach(() => {
            browser.url("/videos/create");

            browser.setValue("#video-title-input", title);
            browser.setValue("#video-url-input", url);
            browser.click("#submit-button");
        });

        it("renders the video in the list", () => {
            browser.url("/");

            assert.equal(browser.getAttribute("iframe", "src"), url);
            assert.include(browser.getText("#videos-container .video-title"), title);
        });
    });
});
