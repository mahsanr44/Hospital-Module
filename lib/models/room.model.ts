import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  tokenId: {type:mongoose.Schema.Types.ObjectId, ref: 'Token', },
  roomType: { type: String, },
  totalTime: { type: String,  },
  name: { type: String,  },
  checked: { type: Boolean,  },
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;
