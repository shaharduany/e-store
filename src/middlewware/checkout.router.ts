import { Router } from "express";
import { fixUserCart } from "../controllers/cart.controller";
import { getCheckout, getcHECKOUTFail, getSuccessCheckout } from "../controllers/checkout.controller";
import { userIsValid } from "../controllers/user.controller";

const checkoutRouter = Router();

checkoutRouter.get("/api/checkout", userIsValid, fixUserCart, getCheckout);
checkoutRouter.get("/api/checkout/success", userIsValid, fixUserCart, getSuccessCheckout);
checkoutRouter.get("/api/checkout/cancel", getcHECKOUTFail);
export default checkoutRouter;