import express from 'express';
import {
	getProducts,
	getCustomers,
	getTransactions,
	getGeography,
} from '../controllers/client.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/ustomers', getCustomers);
router.get('/transactions', getTransactions);
router.get('/geography', getGeography);

export default router;
