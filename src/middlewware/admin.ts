import { Router } from "express";

const adminRouter = Router();

adminRouter.post("/api/admin/add-item", (req, res, next) => {});
adminRouter.get("/api/admin/purchases", (req, res, next) => {});

export default adminRouter;