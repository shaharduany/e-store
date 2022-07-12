import { Router } from "express";
import { fixUserCart } from "../controllers/cart.controller";
import { getCheckout } from "../controllers/checkout.controller";
import { userIsValid } from "../controllers/user.controller";

const checkoutRouter = Router();

checkoutRouter.get("/checkout", userIsValid, fixUserCart, getCheckout);


export default checkoutRouter;