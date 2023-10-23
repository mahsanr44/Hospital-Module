import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  tokenNumber: { type: String, required: true, unique: true },
  patientType: { type: String, required: true },
  counterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Counter' },
  processFlowId:{type:mongoose.Schema.Types.ObjectId, ref: 'ProcessFlow', },
  roomId:{type:mongoose.Schema.Types.ObjectId, ref: 'Room', },
});

const Token = mongoose.models.Token || mongoose.model("Token", tokenSchema);
export default Token;
