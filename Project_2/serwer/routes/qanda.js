const express = require("express");
const router = express.Router();
const {qanda} = require("../models");
const {validateQanda} = require("../middlewares/authmiddleware");

router.get("/", async(req, res)=>{
    const qa = await qanda.findAll();
    res.json(qa)
})

router.post("/", validateQanda, async(req, res)=>{
    const question = req.body.question;
    const answer = req.body.answer;
    if (answer === undefined) {
        const [q, created] = await qanda.findOrCreate({
            where: {question:question},
            defaults: {question:question}
        })
        if (created) {
            res.json("Question sent")
        } else {
            res.json("Question exists")
        }
    } else {
        await qanda.update(
            {answer:answer},
            {where: {question:question}}
        )
        res.json("Answer sent")
    }
})

module.exports = router;