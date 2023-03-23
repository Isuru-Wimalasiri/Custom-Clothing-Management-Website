import express from 'express';
import {
  getCart,
  getCarts,
  deleteCart,
  updateCart,
  createCart,
} from '../controllers/cartController.js';

import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyAdmin, getCarts);
router.get('/:userId', verifyUser, getCart);
//maybe some bug here
router.post('/', verifyToken, createCart);
router.put('/:id', verifyUser, updateCart);
router.delete('/:id', verifyUser, deleteCart);

export default router;
