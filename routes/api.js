const express = require("express");
const Article = require("../models/News");
const router = express.Router();

router.get("/", (req, res) => {
  const search = req.query.search || "";
  let sort = req.query.sort || -1;

  if (sort !== -1 || sort !== 1) {
    sort = -1;
  }

  const findArticle = Article.find({
    title: new RegExp(search.trim(), "i"),
  }).sort({ date: sort });

  findArticle.exec((err, data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const findArticle = Article.findById(id);

  findArticle.exec((err, data) => {
    res.json(data);
  });
});

module.exports = router;
