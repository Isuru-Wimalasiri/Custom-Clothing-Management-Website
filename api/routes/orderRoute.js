import {
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  createOrder,
} from '../controllers/orderController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyAdmin, getOrders);
router.get('/find/:userId', verifyUser, getOrder);
router.post('/', verifyToken, createOrder);
router.put('/:id', verifyAdmin, updateOrder);
router.delete('/:id', verifyAdmin, deleteOrder);

export default router;
