import { Router } from "express";

import { getMoreProducts, getProducts, getUserCart, postAddItemToCart, postSearchProduct } from '../controllers/products'; 
import { userIsValid } from "../controllers/user";

const router = Router();

router.get("/api/products", getProducts);
router.get("/api/products/:amount", getMoreProducts);
router.get("/api/products/get-user-cart", (req, res) => {
    console.log("got here");
    res.status(200).json({ cart: [] });
});

router.post("/api/products/search-by-genre", postSearchProduct);
router.post("/api/products/add-to-cart", postAddItemToCart)

export default router;