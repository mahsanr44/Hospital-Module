import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientType: { type: String, required: true },
  patientToken: { type: String, required: true, unique: true },
});

const Patient =
  mongoose.models.Patient || mongoose.model("Patient", patientSchema);
export default Patient;
