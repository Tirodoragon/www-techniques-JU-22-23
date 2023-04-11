const express = require("express");
const router = express.Router();
const {ourpets} = require("../models");
const {Buffer} = require("buffer");
const {validateAdmin} = require("../middlewares/authmiddleware");

router.get("/", async(req, res)=>{
    const op = await ourpets.findAll();
    res.json(op)
})

router.post("/", validateAdmin, async(req, res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const flag = req.body.flag;
    if (flag === undefined) {
        let blob = Buffer.from(image.split(",")[1], "base64")
        await ourpets.create({
            name: name,
            description: description,
            image: blob
        })
        res.json("Pet added")
    } else {
        await ourpets.destroy({
            where: {
                name: name
            }
        })
        res.json("Pet deleted")
    }
})

module.exports = router;