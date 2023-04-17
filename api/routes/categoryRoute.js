import express from 'express';
import {
  getCategory,
  getCategories,
  deleteCategory,
  createCategory,
  updateCategory,
  upload,
} from '../controllers/categoryController.js';
import { verifyAdmin, verifyUser, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:categoryId', getCategory);
router.get('/', getCategories);
//router.get('/category', diffCategories);
router.post('/', verifyAdmin, upload.single('image'), createCategory);
router.put('/id', verifyAdmin, updateCategory);
router.delete('/:id', verifyAdmin, deleteCategory);

export default router;
