const {verify} = require("jsonwebtoken")
const validateToken = (req, res, next)=>{
    const accessToken = req.header("token")
    if (!accessToken) {
        return res.json("Użytkownik niezalogowany")
    }
    try {
        const validToken = verify(accessToken, "Jg17hCdNrE5VP9c2bvC6ZWVmZgaYHMFi")
        if (validToken) {
            return next();
        }
    }
    catch (err) {
        return res.json("Error")
    }
}

const validateAdmin = (req, res, next)=>{
    const accessToken = req.header("token")
    if (!accessToken) {
        return res.json("Użytkownik niezalogowany")
    }
    try {
        const validToken = verify(accessToken, "Jg17hCdNrE5VP9c2bvC6ZWVmZgaYHMFi")
        console.log(validToken)
        if (validToken.isSupervisor) {
            return next()
        }
        return res.json("Not admin");
    }
    catch (err) {
        return res.json("Error")
    }
}

const validateQanda = (req, res, next)=>{
    const accessToken = req.header("token")
    if (!accessToken) {
        return res.json("Użytkownik niezalogowany")
    }
    try {
        const validToken = verify(accessToken, "Jg17hCdNrE5VP9c2bvC6ZWVmZgaYHMFi")
        if (validToken.isSupervisor && req.body.answer) {
            return next();
        } else if (!validToken.isSupervisor && req.body.question && !req.body.answer) {
            return next();
        } else {
            return res.json("Error")
        }
    }
    catch (err) {
        return res.json("Error")
    }
}

module.exports = {validateToken, validateAdmin, validateQanda}