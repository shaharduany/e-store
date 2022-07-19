import { Router } from "express";
import { fixUserCart } from "../controllers/cart.controller";
import { getStartUserInfo, getUserHistory, getUserInformation, postBuyProducts, userIsValid } from "../controllers/user.controller";
const router = Router();

router.get("/api/user/get-info", userIsValid, getUserInformation);
router.get("/api/user/get-start-info", userIsValid,fixUserCart, getStartUserInfo);
router.get("/api/user/get-user-history", userIsValid, getUserHistory);
router.post("/api/user/buy-products", userIsValid, fixUserCart, postBuyProducts);

export default router;
