require("dotenv").config();
//This is a commentS
const express = require("express");
const passport = require("passport");
const app = express();
const PORT = process.env.PORT || 3001;

const { connection } = require("./connection");
const { verifyStrategy, registerStrategy, loginStrategy } = require("./middleware/auth");
const User = require("./models/user");
const userRouter = require("./routes/user");
const Music = require("./models/index");
const Playlist = require("./models/playlist");
const musicRouter = require("./routes/index");
const playlistRouter = require("./routes/playlist")

app.use(express.json());
app.use(passport.initialize());
// this is a comment whatever
// app.get("/", (req, res) => res.status(200).json({msg: "Worked!"}));
app.use("/index", musicRouter);
app.use("/playlist", playlistRouter);
passport.use("register", registerStrategy);
passport.use("login", loginStrategy);
passport.use(verifyStrategy);

app.use("/users", userRouter);

app.listen(PORT, () => {
    connection.authenticate();
    User.sync({alter: true});
    Music.sync({alter: true});
    Playlist.sync({alter: true});
    console.log("App Online");
});

