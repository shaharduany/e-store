import { RequestHandler } from "express";
import Genre from "../models/genre";
import Product from "../models/product";
import { userIsValid } from "./user";

export const getProducts: RequestHandler = async (req, res, next) => {
	let products: Product[] = [];
	try {
		products = await Product.findAll({ limit: 10 });
	} catch (err) {
		res.status(500).json({
			message: "something went wrong",
			error: err,
			products: [],
		});
	}

	res.status(201).json({
		message: "Sent products",
		products,
	});
};

export const getMoreProducts: RequestHandler = async (req, res, next) => {
	const amount = Number(req.query.amount);

	const products = await Product.findAll({ limit: amount });
};

export const postSearchProduct: RequestHandler = async (req, res, next) => {
	const { genre } = req.body.genre;

	const genremOD = await Genre.findOne({ where: { name: genre } });

	if (!genremOD) {
		res.status(422).json({
			message: "couldn't find products",
			found: false,
            products: [],
		});
		return;
	}

	const products = await Product.findAll({
		where: {
			genre: genremOD.getDataValue("id"),
		},
	});

    res.status(201).json({
        message: "found items",
        found: true,
        products,
    });
};

export const postAddItemToCart: RequestHandler = async(req, res, next) => {
	try {
		const { id } = req.body;
		const product = await Product.findByPk(id);
		
		if(!product) {
			throw new Error("Product wasn't found");
		}
		if(!req.session.cart){
			req.session.cart = [];
		}
		req.session.cart.push(id);
		req.session.save();
		
		res.status(201).json({
			message: "Item was added"
		});
	} catch (err) {
		res.status(422).json({
			message: `Something went wrong, reason: ${err}`,
			error: err
		});
	}
}