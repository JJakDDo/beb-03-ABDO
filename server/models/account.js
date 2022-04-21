import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  userId: String,
  password: String,
  nickname: String,
  address: String,
  privateKey: String,
  token: {
	type: Number,
	default: 0
  },
  nft: [mongoose.ObjectId]
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
