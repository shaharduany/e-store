import { Router } from "express";
import {
	fixUserCart,
	postAddItemToCart,
	postDeleteItem,
} from "../controllers/cart.controller";
import { userIsValid } from "../controllers/user.controller";

const router = Router();

router.post(
	"/api/cart/add-to-cart",
	userIsValid,
	fixUserCart,
	postAddItemToCart
);
router.post(
	"/api/cart/delete-cart-item",
	userIsValid,
	fixUserCart,
	postDeleteItem
);

export default router;
