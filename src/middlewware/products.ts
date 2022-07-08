import { Router } from "express";

import { getMoreProducts, getProducts, postAddItemToCart, postSearchProduct } from '../controllers/products'; 
import { userIsValid } from "../controllers/user";

const router = Router();

router.get("/api/products", getProducts);

router.get("/api/products/:amount", getMoreProducts);

router.post("/api/products/search-by-genre", postSearchProduct);

router.post("/api/products/add-to-cart", userIsValid, postAddItemToCart)

export default router;