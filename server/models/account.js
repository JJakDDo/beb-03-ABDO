import mongoose from 'mongoose';
import Nft from './nft.js';

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
  nft: {
	type: [Number],
	default: []
  }
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
