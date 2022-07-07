import { RequestHandler } from "express";
import Product from "../models/product";

export const getProducts:RequestHandler = async(req, res, next) => {
    let products: Product[] = [];
    try {
        products = await Product.findAll({ limit: 10 });
    } catch (err) {
        res.status(500).json({ 
            message: "something went wrong",
            error: err,
            products: []
        });
    }

    res.status(201).json({
        message: 'Sent products',
        products
    });
};