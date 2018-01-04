#!/usr/bin/env node
const { mongoose, databaseUrl, options } = require("../database");
const Item = require("../models/video");

const seed = async () => {
    await mongoose.connect(databaseUrl, options);
    const video1 = {
        title: "Seed Video 1",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu nibh velit. Phasellus libero nisl, dictum ut feugiat sit amet, varius a magna. Etiam id diam nec dolor luctus ornare ut ut risus. Donec vel laoreet ex. Quisque sapien nisl, accumsan eget blandit a, porta vitae velit. Nunc ipsum justo, pellentesque non dolor vitae, volutpat sagittis est. Morbi commodo, leo at condimentum pretium, turpis tellus eleifend ligula, sed efficitur elit massa id est. Suspendisse ultricies nibh vitae eleifend varius. Sed eu diam dignissim, faucibus ante in, vehicula ex. Praesent eu tempus odio.`,
    };
    const video2 = {
        title: "Seed Video 2",
        description: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    };
    const video3 = {
        title: "Seed Video 3",
        description: `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`,
    };

    await Item.create(video1);
    await Item.create(video2);
    await Item.create(video3);
};

seed()
    .then(() => {
        console.log("Seeded database sucessfully");
        process.exit(0);
    })
    .catch(err => {
        console.log("Database seed unsuccessful");
        throw err;
        process.exit(1);
    });
