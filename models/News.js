const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const article = new Schema({
  title: { type: "String", required: true },
  desc: { type: "String", required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", article);
