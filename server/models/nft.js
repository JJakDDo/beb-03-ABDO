import mongoose from 'mongoose';

const nftSchema = mongoose.Schema({
  productId: Number,
  name: String,
  url: String,
  price: Number
});

const Nft = mongoose.model('Nft', nftSchema);

export default Nft;
