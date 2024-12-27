const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();
const passport = require("passport");

require("../config/passport.js");

/* ------------------- GETs ------------------- */
router.get("/", controller.getIndexPage);
router.get("/sign-up", (req, res) => res.render("sign-up"));
router.get("/sign-in", (req, res) => res.render("sign-in"));
router.get("/sign-out", controller.logout);
router.get("/navigate", controller.getDirectory)
router.get("/navigate/:id", controller.getDirectory)

router.get("/add-file", controller.addFileGet)
router.get("/add-folder", controller.addFolderGet)


/* ------------------- POSTs ------------------- */
router.post("/sign-up", controller.signUpPost);
router.post(
    "/sign-in",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/sign-in",
    })
);
router.post("/add-file", controller.addFilePost)
router.post("/add-folder/:id", controller.addFolderPost)
router.post("/delete/:id", controller.deleteFolderPost)

module.exports = router;
