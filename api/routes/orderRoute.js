import express from 'express';
import {
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  getIncome,
} from '../controllers/orderController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyAdmin, getOrders);
router.get('/find/:userId', verifyUser, getOrder);
router.post('/', verifyUser, createOrder);
router.put('/:id', verifyUser, updateOrder);
router.delete('/:id', verifyAdmin, deleteOrder);
router.get('/income', verifyAdmin, getIncome);

export default router;
