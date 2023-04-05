import express from 'express';
import {
  getCart,
  getCarts,
  deleteCart,
  updateCart,
  createCart,
  getCartsByUserID,
} from '../controllers/cartController.js';

import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyAdmin, getCarts);
router.get('/find/:userId', verifyUser, getCartsByUserID);
//maybe some bug here
router.post('/', createCart);
router.put('/:id', verifyUser, updateCart);
router.delete('/:id', verifyUser, deleteCart);

export default router;
