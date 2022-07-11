import { Router } from "express";
import { fixUserCart } from "../controllers/cart";
import { getStartUserInfo, getUserInformation, userIsValid } from "../controllers/user";
const router = Router();

router.get("/api/user/get-info", userIsValid, getUserInformation);
router.get("/api/user/get-start-info", userIsValid,fixUserCart, getStartUserInfo);

router.post("/api/user/buy-products", userIsValid, (req, res, next) => {});
export default router;
