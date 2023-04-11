const express = require("express");
const router = express.Router();
const {users} = require("../models");
const {sign} = require("jsonwebtoken");

router.get("/", async(req, res)=>{
    const login = req.query.login;
    const password = req.query.password;
    const user = await users.findOne({
        where: {login:login}
    });
    if (user === null) {
        res.json("Login not found")
    } else if (user.password !== password) {
        res.json("Wrong password")
    } else {
        const access_token = sign({login:user.login, isSupervisor:user.isSupervisor}, "Jg17hCdNrE5VP9c2bvC6ZWVmZgaYHMFi")
        res.json({token:access_token, sup:user.isSupervisor})
    }
})

router.post("/", async(req, res)=>{
    const login = req.query.login;
    const password = req.query.password;
    const supervisor = req.query.sup;
    const admin = await users.findOne({
        where: {isSupervisor:1}
    })
    if (admin && supervisor === '1') {
        res.json("Admin exists")
    } else {
        const [u, created] = await users.findOrCreate({
            where: {login:login},
            defaults: {
                login:login,
                password:password,
                isSupervisor:supervisor
            }
        });
        if (created) {
            res.json("User created")
        } else {
            res.json("User exists")
        }
    }
})

module.exports = router;