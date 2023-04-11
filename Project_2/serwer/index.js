const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models");

const bodyparser = require("body-parser")

app.use(bodyparser.json({
    limit:"5mb"
}));
app.use(cors());

// Routery:
const dailypetrouter = require("./routes/dailypet");
app.use("/dailypet", dailypetrouter);
const foundationrouter = require("./routes/foundation");
app.use("/foundation", foundationrouter);
const imagesrouter = require("./routes/images");
app.use("/images", imagesrouter);
const messagesrouter = require("./routes/messages");
app.use("/messages", messagesrouter);
const ourpetsrouter = require("./routes/ourpets");
app.use("/ourpets", ourpetsrouter);
const qandarouter = require("./routes/qanda");
app.use("/qanda", qandarouter);
const usersrouter = require("./routes/users");
app.use("/users", usersrouter);

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Serwer działa na porcie 3001!");
    });
});