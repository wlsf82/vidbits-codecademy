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

router.get("/videos/:id", async (req, res, next) => {
    const video = await Video.findById({_id: req.params.id});

    res.render("videos/show", { video });
});

router.post("/videos", async (req, res, next) => {
    const { title, description, url } = req.body;

    const newVideo = new Video({
        title,
        description,
        url,
    });

    newVideo.validateSync();

    if (newVideo.errors) {
        res.status(400).render(
            "videos/create", { newVideo }
        );
    } else {
        const video = await newVideo.save();

        res.status(201).render("videos/show", { video });
    }
});

module.exports = router;
