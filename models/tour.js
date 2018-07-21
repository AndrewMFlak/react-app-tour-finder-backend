const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  price: {type: Number, required: true},
  description: String,
  date: { type: Date, default: Date.now }
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
