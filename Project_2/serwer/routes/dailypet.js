const express = require("express");
const router = express.Router();
const {dailypet} = require("../models");
const {validateToken} = require("../middlewares/authmiddleware");

router.get("/", validateToken, async(req, res)=>{
    const login = req.query.login;
    const dp = await dailypet.findOne({
        where: {
            login:login
        }
    });
    res.json(dp)
})

router.post("/", validateToken, async(req, res)=>{
    const login = req.query.login;
    const [i, created] = await dailypet.findOrCreate({
        where: {
            login:login
        },
        defaults: {
            login: login
        }
    })
    if (created) {
        res.json("Daily pet successful")
    } else {
        await dailypet.update(
            {login:login},
            {where: {login:login}}
        )
        res.json("Daily pet successful")
    }
})

module.exports = router;