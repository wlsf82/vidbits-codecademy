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
            assert.include(browser.getText("#videos-container h3"), title);
            assert.include(browser.getText("#videos-container p"), description);
        });
    });
});
