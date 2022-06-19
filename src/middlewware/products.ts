import { Router } from "express";

import { getProducts } from '../controllers/products'; 

const router = Router();

router.get("/api/get-products", getProducts);

export default router;