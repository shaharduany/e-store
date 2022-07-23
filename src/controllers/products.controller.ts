import e, { RequestHandler } from "express";
import tedis from "../lib/redis";
import Genre from "../models/genre";
import Product from "../models/product";

const ALL_PRODUCTS_KEY = "AllProducts";

export const getProductsCache: RequestHandler = async(req, res, next) => {
	try {
		let products = await tedis.get(ALL_PRODUCTS_KEY) as string;
		if(products){
			res.status(201).json({
				message: "Sent products from cache",
				products: JSON.parse(products)
			});
			return;
		}
	} catch (err){
		console.log(err);
	}
	next();
}

export const getProducts: RequestHandler = async (req, res, next) => {
	let products: ClientProduct[] = [];
	try {
		const productsDb = await Product.findAll({ limit: 10 });
		products = await convertProductsClient(productsDb);
		tedis.setex(ALL_PRODUCTS_KEY,60 * 60 * 24, JSON.stringify(products));

		res.status(201).json({
			message: "Sent products",
			products,
		});
	} catch (err) {
		res.status(500).json({
			message: "something went wrong",
			error: err,
			products,
		});
	}
};

export const getMoreProducts: RequestHandler = async (req, res, next) => {
	const amount = Number(req.query.amount);

	const products = await Product.findAll({ limit: amount });
};

export const getSearchProduct: RequestHandler = async (req, res, next) => {
	try {
		let { genre } = req.params;
		genre = genre.toLocaleLowerCase();
		const genremOD = await Genre.findOne({ where: { name: genre } });

		if (!genremOD) {
			throw new Error("couldn't find genre");
		}

		const productsDb = await Product.findAll({
			where: {
				genre: genremOD.getDataValue("id"),
			},
		});

		const products = await convertProductsClient(productsDb);
		await tedis.setex(genre, 60 * 60, JSON.stringify(products));

		res.status(201).json({
			message: "found items",
			found: true,
			products,
		});
	} catch (err) {
		console.log(err);
		res.status(422).json({
			message: "couldn't find products",
			found: false,
			products: [],
		});
	}
};

export const cacheSearch: RequestHandler = async (req, res, next) => {
	try {
		const genre = req.params.genre.toLocaleLowerCase();

		const cache = (await tedis.get(genre)) as string;

		if (cache) {
			const products = JSON.parse(cache);
			res.status(201).json({
				message: "found items",
				found: true,
				products,
			});
			return;
		}
		next();
	} catch (err) {
		res.status(500).json({
			message: `something went wrong`,
			found: false,
			products: [],
		});
	}
};

interface ClientProduct {
	title: string;
	description: string;
	price: number;
	genre: string;
}

async function convertProductsClient(products: Product[]) {
	let arr: ClientProduct[] = [];
	try {
		for (let product of products) {
			let genre = await Genre.findByPk(product.getDataValue("id"));
			arr.push({
				title: product.getDataValue("title"),
				description: product.getDataValue("description"),
				price: product.getDataValue("price"),
				genre: genre?.getDataValue("name")
			});
		}
	} catch (err) {
		console.log(err);
	}
	return arr;
}
