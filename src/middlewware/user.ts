import { Router } from "express";
import { getStartUserInfo, getUserInformation, postDeleteItem, userIsValid } from "../controllers/user";
const router = Router();

router.get("/api/user/get-info", userIsValid, getUserInformation);
router.get("/api/user/get-start-info", userIsValid, getStartUserInfo);

router.post("/api/user/buy-products", userIsValid, (req, res, next) => {});
router.post("/api/user/delete-cart-item", userIsValid, postDeleteItem);
export default router;
