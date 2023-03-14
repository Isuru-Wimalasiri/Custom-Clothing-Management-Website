import express from 'express';
import { verify } from 'jsonwebtoken';
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/userController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

//GET ALL
router.get('/', verifyAdmin, getUsers);
//GET
router.get('/:id', verifyUser, getUser);
//UPDATE
router.put('/:id', verifyUser, updateUser);
//DELETE
router.delete('/:id', verifyUser, deleteUser);

//router.get('/stats', isAdminVerifier, UserController.get_stats);

export default router;
