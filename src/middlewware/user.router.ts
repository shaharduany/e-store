import { Router } from "express";
import { fixUserCart } from "../controllers/cart.controller";
import { getStartUserInfo, getUserInformation, postBuyProducts, userIsValid } from "../controllers/user.controller";
const router = Router();

router.get("/api/user/get-info", userIsValid, getUserInformation);
router.get("/api/user/get-start-info", userIsValid,fixUserCart, getStartUserInfo);

router.post("/api/user/buy-products", userIsValid, fixUserCart, postBuyProducts);

export default router;
