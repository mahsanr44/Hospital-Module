import mongoose from "mongoose";

const processFlowSchema = new mongoose.Schema({
  processFlow: { type: [String], required: true },

});

const ProcessFlow =
  mongoose.models.ProcessFlow || mongoose.model("ProcessFlow", processFlowSchema);
export default ProcessFlow;
