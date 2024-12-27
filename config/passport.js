const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models/queries");
const pw = require("../passwordUtils/pw-encrypt");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await pw.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      console.log("logged in!", user.username);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await db.getUserByID(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;