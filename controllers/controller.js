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

  res.render("index", { user: req.user, contents: contents });
};

exports.getDirectory = async (req, res) => {

  const contents = await db.getContentsByID(req.params.id);
  contents.children = await db.getContentChildren(req.params.id);
  contents.type == "FILE" ? null : (contents.title += "/");

  contents.children.forEach((child) => {
    child.type == "FILE" ? null : (child.title += "/");
  });

  req.session.contents = contents;

  res.render("content", {
    user: req.user,
    contents: contents,
  });
  // }
};

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
  const contents = await db.getContentsByID(Number(req.params.id));

  const result = await db.addFolder(contents.id, name, req.user);

  res.send({ message: "recieved" });

  // res.location(req.get("Referrer"));
};

exports.deleteFolderPost = async (req, res) => {
  const { id } = req.body;

  const result = await db.deleteFolder(id);


  res.send({
    message: "recieved",
    parentID: result.parentID,
  });
};
