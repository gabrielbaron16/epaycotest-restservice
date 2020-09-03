import { Router } from 'express';
import ClientRouter from './client';
import TransactionRouter from './transaction';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/client', ClientRouter);
router.use('/transaction', TransactionRouter);

// Export the base-router
export default router;
