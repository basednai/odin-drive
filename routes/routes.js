const { Router } = require("express");
const controller = require("../controllers/controller");
const router = Router();
const passport = require("passport");
const multer = require("multer");

/* ------------------- multer config ------------------- */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
    },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

require("../config/passport.js");

/* ------------------- GETs ------------------- */
router.get("/", controller.getIndexPage);
router.get("/sign-up", (req, res) => res.render("sign-up"));
router.get("/sign-in", (req, res) => res.render("sign-in"));
router.get("/sign-out", controller.logout);
router.get("/navigate", controller.getDirectory);
router.get("/navigate/:id", controller.getDirectory);

router.get("/add-file", controller.addFileGet);
router.get("/add-file/:id", controller.addFileGet);
router.get("/add-folder", controller.addFolderGet);

router.get("/file/:id", controller.fileGet);
router.get("/file/:id/download", controller.fileDownloadGet);
router.get("/file/:id/delete", controller.fileDeleteGet);

/* ------------------- POSTs ------------------- */
router.post("/sign-up", controller.signUpPost);
router.post(
  "/sign-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-in",
  })
);
router.post("/add-file/:id", upload.single('newFile'), controller.addFilePost);
router.post("/add-folder/:id", controller.addFolderPost);
router.post("/delete/:id", controller.deleteFolderPost);

module.exports = router;
