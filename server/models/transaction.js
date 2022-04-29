import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  txHash: String,
  method: String,
  token: Number,
  userId: String,
  productId: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
