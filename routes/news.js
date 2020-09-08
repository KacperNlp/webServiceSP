const express = require("express");
const router = express.Router();
const Article = require("../models/News");

/* GET home page. */
router.get("/", (req, res) => {
  const search = req.query.search || "";
  const findArticles = Article.find({
    title: RegExp(search.trim(), "i"),
  }).sort({ date: -1 });

  findArticles.exec((err, data) => {
    if (err) {
      return res.redirect("/index");
    }
    res.render("news", { title: "Aktualności", data, search });
  });
});

module.exports = router;
