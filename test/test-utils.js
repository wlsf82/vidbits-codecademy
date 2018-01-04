const { jsdom } = require("jsdom");

const Video = require("../models/video");

const parseTextFromHTML = (htmlAsString, selector) => {
    const selectedElement = jsdom(htmlAsString).querySelector(selector);

    if (selectedElement !== null) {
        return selectedElement.textContent;
    } else {
        throw new Error(`No element with selector ${selector} found in HTML string`);
    }
};

module.exports = { parseTextFromHTML };
