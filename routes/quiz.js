const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("Quiz", { message: "Witaj w naszym Quizie!" });
});

module.exports = router;
