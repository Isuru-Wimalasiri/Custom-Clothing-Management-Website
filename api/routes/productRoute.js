import express from 'express';
import {
  getProduct,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  diffCategories,
  upload,
} from '../controllers/productController.js';
import { verifyAdmin, verifyUser, verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/find/:id', getProduct);
router.get('/', getProducts);
router.get('/category', diffCategories);
router.post(
  '/:categoryId',
  upload.array('photos', 2),
  verifyAdmin,
  createProduct
);
router.put('/id', verifyAdmin, updateProduct);
router.delete('/:id', verifyAdmin, deleteProduct);

export default router;
