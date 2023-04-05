import express from 'express';
import { verify } from 'jsonwebtoken';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  getUsersStat,
} from '../controllers/userController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();
//GET ALL
router.get('/', verifyAdmin, getUsers);
//GET
router.get('/:id', verifyUser, getUser);
//UPDATE
router.put('/:id', verifyUser, updateUser);
//DELETE
router.delete('/:id', verifyUser, deleteUser);
//STATS
router.get('/find/stats', verifyAdmin, getUsersStat);

export default router;
