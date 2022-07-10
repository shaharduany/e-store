import { Router } from 'express';
import { postAddItemToCart, postDeleteItem } from '../controllers/cart';
import { userIsValid } from '../controllers/user';

const router = Router();

router.post("/api/cart/add-to-cart", userIsValid, postAddItemToCart);
router.post("/api/cart/delete-cart-item", userIsValid, postDeleteItem);

export default router