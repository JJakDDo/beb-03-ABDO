import express from "express";

import {createAccount, getAccount, login, getBalance} from '../controllers/account.js';

const router = express.Router();

// Get Account
router.get('/:userId', getAccount);

// Create Account
router.post('/', createAccount);

// Log in
router.post('/login', login);

router.get('/balance/:address', getBalance);

export default router;
