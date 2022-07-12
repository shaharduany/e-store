import { Router } from "express";

import { getMoreProducts, getProducts, postSearchProduct } from '../controllers/products.controller'; 

const router = Router();

router.get("/api/products", getProducts);
router.get("/api/products/:amount", getMoreProducts);

router.post("/api/products/search-by-genre", postSearchProduct);

export default router;