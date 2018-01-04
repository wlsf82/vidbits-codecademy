const router = require("express").Router();

const Video = require("../models/video");

router.get("/", async (req, res, next) => {
    res.redirect("/videos");
});

router.get("/videos", async (req, res, next) => {
    const videos = await Video.find({});

    res.render("videos/index", { videos });
});

router.get("/videos/create", async (req, res, next) => {
    const videos = await Video.find({});

    res.render("videos/create", { videos });
});

router.post("/videos", async (req, res, next) => {
    const { title, description } = req.body;

    const newVideo = new Video({
        title,
        description,
    });

    newVideo.validateSync();

    if (newVideo.errors) {
        res.status(400).render("videos/create", { newVideo });
    } else {
        const videoToCreate = await Video.create({ title, description });

        res.status(201).render("videos/show", { videoToCreate });
    }
});

module.exports = router;
