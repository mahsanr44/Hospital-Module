import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
  tokenId: {type:mongoose.Schema.Types.ObjectId, ref: 'ProcessFlow', },
  roomData: [
    {
      roomType: { type: String, required: true },
      timeSpent: { type: Number, required: true }
    }
  ]
}, );

const Time =
  mongoose.models.Time || mongoose.model("Time", timeSchema);
export default Time;
