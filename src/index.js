const express = require("express");
const routes = require("./routes/api/v1/index");
const connectDB = require("./db/mongodb");
var cookieParser = require('cookie-parser')
const passport = require("passport");
const { facebookProvider, googleProvuder } = require("./utilse/Provider");
const pdfmake = require("./utilse/pdfcrate");


const app = express();
const cors = require('cors');
const connectChat = require("./utilse/Socket");

app.use(cookieParser())
app.use(cors())
app.use(require('express-session')({ secret: 'aaa$12', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use("/api/v1", routes);


connectDB();


googleProvuder();
facebookProvider();
pdfmake();

connectChat()

app.listen(5000, () => {
    console.log("server is running on port 5000");
})
