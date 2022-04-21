import mongoose from "mongoose";

const contractSchema = mongoose.Schema({
  contractAddress: String,
  type: String,
});

const Contract = mongoose.model("Contract", contractSchema);

export default Contract;
