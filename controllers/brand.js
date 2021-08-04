const Brand = require("../models/brand");
const Generation = require("../models/generation");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        // const Generation = await new Generation({ name, slug: slugify(name) }).save();
        // res.json(generation);
        //res.json(await new Generation({ name, slug: slugify(name) }).save());
        res.json(await new Brand({ name, slug: name }).save());
    } catch (err) {
        // console.log(err);
        res.status(400).send("Create brand failed");
    }
};

exports.list = async (req, res) =>
    res.json(await Brand.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
    let brand = await Brand.findOne({ slug: req.params.slug }).exec();
    res.json(brand);
};

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Brand.findOneAndUpdate(
            { slug: req.params.slug },
            //{ name, slug: slugify(name) },
            { name, slug: name },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Brand update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Brand.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Brand delete failed");
    }
};

exports.getGenerations = (req, res) => {
    Generation.find({ parent: req.params._id }).exec((err, generations) => {
        if (err) console.log(err);
        res.json(generations);
    });
};
