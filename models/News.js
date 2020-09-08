const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const article = new Schema({
  title: {
    type: "String",
    required: [true, "Pole tytuł musi być uzupełnione!"],
  },
  desc: {
    type: "String",
    required: [true, "Pole tekst musi być uzupełnione!"],
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", article);
