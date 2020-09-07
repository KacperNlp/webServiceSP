const express = require("express");
const Article = require("../models/News");
const router = express.Router();

router.all("*", (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("login");
    return;
  }
  next();
});

router.get("/", (req, res) => {
  const newArticle = new Article({
    title: "Twoja twarz brzmi znajomo!",
    desc:
      "Jest to nowy format przedstawiania  twarzy znanych gwiazd, przez inne gwiazdy, ostatnia edycja przyjeła się...",
  });

  newArticle.save((err) => {
    console.log(err);
  });
  res.render("admin/index", { title: "Admin" });
});

router.get("/article/add", (req, res) => {
  res.render("admin/article-form", { title: "Dodaj newsa" });
});

router.post("/article/add", (req, res) => {
  res.render("admin/article-form", { title: "Dodaj nwesa" });
});

module.exports = router;
