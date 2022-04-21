import express from 'express';

import {createAccount} from '../controllers/account.js';

const router = express.Router();

rotuer.post('/', createAccount);

export default router;
