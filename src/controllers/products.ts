import { RequestHandler } from "express";

export const getProducts:RequestHandler = async(req, res, next) => {
    res.status(201).json({ message: "went well" });
};