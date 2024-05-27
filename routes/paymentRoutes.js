// server/routes/paymentRoutes.js
import express from 'express';
import { verifyKhaltiPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/verify', verifyKhaltiPayment);

export default router;
