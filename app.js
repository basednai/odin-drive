const express = require("express");
const router = require("./routes/routes");
const session = require("express-session");
const passport = require("./config/passport.js");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("@prisma/client");

const app = express();
const PORT = 3000;

/* ------------- passport config -------------- */

app.use(passport.initialize());
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", (req, res, next) => {
    console.log(req.session.contents)
    next()
}, router);

app.listen(PORT, () => console.log("listening on port", PORT));
