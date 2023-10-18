import mongoose from "mongoose";

const roomSequenceSchema = new mongoose.Schema({
  processFlowId: { type: String, required: true },
  sequenceOrder: { type: String, required: true },
  roomId: { type: String, required: true },
});

const RoomSequence =
  mongoose.models.RoomSequence ||
  mongoose.model("RoomSequence", roomSequenceSchema);
export default RoomSequence;
