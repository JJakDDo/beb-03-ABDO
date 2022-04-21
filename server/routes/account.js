import express from 'express';

import {createAccount, getAccount, login} from '../controllers/account.js';

const router = express.Router();

// Get Account
router.get('/:userId', getAccount);

// Create Account
router.post('/', createAccount);

// Log in
router.post('/login', login);

export default router;
