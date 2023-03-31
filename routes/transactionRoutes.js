import express from 'express'
import {getTransaction} from '../controllers/transactions.js'
import { getBalance } from '../controllers/getBalance.js';

const router = express.Router();

//route for getting transaction and saving it in database
router.get('/:address',getTransaction)

//route for getting balance of a user
router.get('/balance/:address',getBalance)

export default router