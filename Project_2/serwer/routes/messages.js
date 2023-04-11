const express = require("express");
const router = express.Router();
const {messages} = require("../models");
const {validateAdmin} = require("../middlewares/authmiddleware");

router.get("/", validateAdmin, async(req, res)=>{
    const msg = await messages.findAll();
    res.json(msg)
})

router.post("/", async(req, res)=>{
    const name = req.body.name;
    const lname = req.body.lname;
    const mess = req.body.mess;
    await messages.create({
        name:name,
        lname:lname,
        mess:mess
    })
    res.json("Message added")
})

module.exports = router;