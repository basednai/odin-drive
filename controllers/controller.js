const db = require("../models/queries");
const pw = require("../passwordUtils/pw-encrypt");
const { body, validationResult } = require("express-validator");
const { validateUser } = require("../utils/input-validation");

exports.signUpPost = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("sign-up", { errors: errors.array() });
      return;
    }

    req.body.password = await pw.encryptPW(req.body.password);
    const result = await db.addUserToDB(req.body);

    res.redirect("/sign-in");
  },
];

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/sign-in");
  });
};

exports.getIndexPage = async (req, res) => {
  const contents = await db.getUserContentsByID(req.user.id);

  contents.type == "FILE" ? null : (contents.title += "/");
  req.user.contents = contents;
  req.session.contents = contents;

  res.render("index", { user: req.user, contents: req.session.contents });
};

exports.getDirectory = async (req, res) => {
  const dir = req.query.path.split("/").pop();

  // contents.type == "FILE" ? null : (contents.title += "/");

  if (dir == "home") {
    const contents = await db.getUserContentsByID(req.user.id);
    req.session.contents = contents;
    req.session.contents.children = await db.getContentChildren(
      req.session.contents.id
    );

    res.render("content", {
      user: req.user,
      contents: req.session.contents,
      url: req.url,
    });
  } else {
    const contents = req.session.contents.children.filter(
      (child) => (child.title == dir)
    )[0];
    console.log("contents", contents);
    console.log("contentsid" ,contents?.id);

    req.session.contents = contents;
    if (contents)
    req.session.contents.children = await db.getContentChildren(contents?.id);




    res.render("content", {
      user: req.user,
      contents: req.session.contents,
      url: req.url,
    });
  }
};

exports.getChildContent = async (req, res) => {};

exports.addFileGet = async (req, res) => {
  res.render("add-file");
}; 

exports.addFilePost = async (req, res) => {
  res.redirect("/");
};

exports.addFolderGet = async (req, res) => {
  res.render("add-folder");
};

exports.addFolderPost = async (req, res) => {
  const { name } = req.body;
  const { contents } = req.session;
  const result = await db.addFolder(contents.id, name, req.user);

  console.log(result);
  res.location(req.get("Referrer"));
};
