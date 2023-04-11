const express = require("express");
const router = express.Router();
const {images} = require("../models");
const {Buffer}= require("buffer");
const {validateToken} = require("../middlewares/authmiddleware");

router.get("/", async(req, res)=>{
    const img = await images.findAll();
    res.json(img)
})

router.post("/", validateToken, async(req, res)=>{
    const name = req.query.name;
    const image = req.body.image;
    const login = req.query.login;
    const flag = req.query.flag;
    if (flag === undefined) {
        let blob = Buffer.from(image.split(",")[1], "base64")
        let file = Buffer.from(blob).toString("base64")
        console.log(image.split(",")[1] == file)
        const [i, created] = await images.findOrCreate({
            where: {
                name: name,
                login: login
            },
            defaults: {
                name: name,
                image: blob,
                login: login
            }
        })
        if (created) {
            res.json("Image added")
        } else {
            res.json("Image exists")
        }
    } else {
        await images.destroy({
            where: {
                name:name,
                login:login
            }
        })
        res.json("Image deleted")
    }
})

module.exports = router;