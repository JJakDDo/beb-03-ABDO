import {getNft, getNfts, createNft, buyNft} from '../controllers/nft.js';

import express from 'express';

const router = express.Router();

router.get('/', getNfts);

router.get('/:productId', getNft);

router.post('/', createNft);

router.post('/:productId', buyNft);

export default router;

