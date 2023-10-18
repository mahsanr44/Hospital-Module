import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  tokenNumber: { type: String, required: true, unique: true },
  patientId: { type: String },
  counterNumber: { type: Number, required: true },
  patientType: { type: String, required: true },
});

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);
export default Counter;
