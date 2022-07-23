import { Router } from "express";

import { cacheSearch, getMoreProducts, getProducts, getProductsCache, getSearchProduct } from '../controllers/products.controller'; 

const router = Router();

router.get("/api/products", getProductsCache, getProducts);
router.get("/api/products/:amount", getMoreProducts);

router.get("/api/products/search/:genre", cacheSearch, getSearchProduct);

export default router;