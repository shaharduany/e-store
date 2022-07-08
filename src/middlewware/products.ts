import { Router } from "express";

import { getMoreProducts, getProducts, postSearchProduct } from '../controllers/products'; 

const router = Router();

router.get("/api/get-products", getProducts);

router.get("/api/get-products/:amount", getMoreProducts);

router.post("/api/search-by-genre", postSearchProduct);

export default router;