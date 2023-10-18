import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  tokenNumber: { type: String, required: true, unique: true },
  processFlowId: { type: String, required: true },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String, required: true },
  patientId: { type: String, required: true },
  roomType: { type: String, required: true },
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;
