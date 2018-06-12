import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  timeline: { type: Array, required: true },
  deck: { type: Array, required: true },
  players: { type: Array, required: true },
  size: { type: Number, required: true },
  name: { type: String, required: true }
});

mongoose.model("Match", schema);
