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
  Article.find({}, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("admin/index", { title: "Panel admina", data });
    }
  });
});

router.get("/article/add", (req, res) => {
  res.render("admin/article-form", {
    title: "Dodaj newsa",
    body: {},
    errors: {},
  });
});

router.post("/article/add", (req, res) => {
  const body = req.body;

  const newArticle = new Article(body);
  const errors = newArticle.validateSync();

  newArticle.save((err) => {
    if (err) {
      res.render("admin/article-form", { title: "Dodaj newsa", body, errors });
      return;
    } else {
      res.redirect("/admin");
    }
  });
});

router.get("/article/delete/:id", (req, res) => {
  Article.findByIdAndDelete(req.params.id, (err) => {
    res.redirect("/admin");
  });
});
module.exports = router;
