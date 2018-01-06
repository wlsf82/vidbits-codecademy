const { assert } = require("chai");

describe("User visits the create video page", () => {
    describe("User fill out a form and submit", () => {
        const title = "Sample video title";
        const description = "Sample video description";
        const url = "http://example.com";

        beforeEach(() => {
            browser.url("/videos/create");

            browser.setValue("#video-title-input", title);
            browser.setValue("#video-description-input", description);
            browser.setValue("#video-url-input", url);
            browser.click("#submit-button");
        });

        it("renders the created video on its on page", () => {
            assert.include(browser.getText("#video-container h3"), title);
            assert.include(browser.getText("#video-container p"), description);
        });
    });

    describe("User fill out a form with missing title and submit", () => {
        const description = "Sample video description";
        const url = "http://example.com";

        beforeEach(() => {
            browser.url("/videos/create");

            browser.setValue("#video-description-input", description);
            browser.setValue("#video-url-input", url);
            browser.click("#submit-button");
        });

        it("shows a error regarding title being required and keep the other fields", () => {
            assert.equal(browser.getText("#create-video-container form span"), "Path `title` is required.");
            assert.equal(browser.getAttribute("#video-description-input", "value"), description);
            assert.equal(browser.getAttribute("#video-url-input", "value"), url);
        });
    });

    describe("User fill out a form with missing url and submit", () => {
        const title = "Sample video title";
        const description = "Sample video description";

        beforeEach(() => {
            browser.url("/videos/create");

            browser.setValue("#video-title-input", title);
            browser.setValue("#video-description-input", description);
            browser.click("#submit-button");
        });

        it("shows a error regarding url being required and keep the other fields", () => {
            assert.equal(browser.getAttribute("#video-title-input", "value"), title);
            assert.equal(browser.getAttribute("#video-description-input", "value"), description);
            assert.equal(browser.getText("#create-video-container form span"), "Path `url` is required.");
        });
    });
});
