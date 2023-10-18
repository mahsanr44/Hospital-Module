import mongoose from "mongoose";

const roomQueueSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  roomNumber: { type: String, required: true },
  rooomType: { type: String, required: true },
});

const RoomQueue =
  mongoose.models.RoomQueue || mongoose.model("RoomQueue", roomQueueSchema);
export default RoomQueue;
