const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");

router.get("/", (req, res) => {
  const show = !req.session.vote;
  let sum = 0;

  Quiz.find({}, (err, data) => {
    data.forEach((item) => {
      sum += item.vote * 1;
    });
    res.render("quiz", { title: "Quiz", data, show, sum });
  });
});

router.post("/", (req, res) => {
  const vote = req.body.season;

  Quiz.findOne({ _id: vote }, (err, data) => {
    data.vote = data.vote + 1;
    data.save((err) => {
      req.session.vote = 1;
      res.redirect("/quiz");
    });
  });
});
module.exports = router;
