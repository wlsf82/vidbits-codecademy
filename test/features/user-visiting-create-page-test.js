const { assert } = require("chai");

describe("User visits the create video page", () => {
    describe("User fill out a form and submit", () => {
        it("returns to the landing page with and the submited information is there", () => {
            const title = "Sample video title";
            const description = "Sample video description";

            browser.url("create.html");

            browser.setValue("#video-title-input", title);
            browser.setValue("#video-description-input", description);
            browser.click("#submit-button");

            assert.include(browser.getText("#videos-container"), title);
            assert.include(browser.getText("#videos-container"), description);
        });
    });
});
