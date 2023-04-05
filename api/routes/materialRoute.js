import express from 'express';
import {
  getMaterial,
  getMaterials,
  deleteMaterial,
  createMaterial,
  updateMaterial,
} from '../controllers/materialController.js';
import { verifyAdmin, verifyUser, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:id', getMaterial);
router.get('/', getMaterials);
router.post('/', verifyAdmin, createMaterial);
router.put('/id', verifyAdmin, updateMaterial);
router.delete('/:id', verifyAdmin, deleteMaterial);

export default router;
