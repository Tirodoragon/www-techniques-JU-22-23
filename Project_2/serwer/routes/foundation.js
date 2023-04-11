const express = require("express");
const router = express.Router();
const {foundation} = require("../models");
const {validateAdmin} = require("../middlewares/authmiddleware");

router.get("/", async(req, res)=>{
    const fd = await foundation.findAll();
    res.json(fd)
})

router.post("/", validateAdmin, async(req, res)=>{
    const name = req.body.name;
    const web = req.body.web;
    const description = req.body.description;
    const flag = req.body.flag;
    if (flag === undefined) {
        await foundation.create({
            name:name,
            web:web,
            description:description
        })
        res.json("Foundation added")
    } else {
        await foundation.destroy({
            where: {
                name: name
            }
        })
        res.json("Foundation deleted")
    }
})

module.exports = router;