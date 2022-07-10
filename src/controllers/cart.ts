import { RequestHandler } from "express";
import Product from "../models/product";
import { ShopItemI } from "../client/src/components/shop/shop-view";
import ClientCart from "../client/src/lib/cart";
import ServerCart from "../lib/user-cart";

export interface ClientCartI {
	items: ClientCart;
}

export const postAddItemToCart: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.body;
		const product = await Product.findByPk(id);

		if (!product) {
			throw new Error("Product wasn't found");
		}

		if (!req.session.cart) {
			req.session.cart = new ServerCart();
		}
		
		req.session.cart.insertOne(id);
		req.session.save();

		res.status(201).json({
			message: "Item was added",
		});
	} catch (err) {
		res.status(422).json({
			message: `Something went wrong, reason: ${err}`,
			error: err,
		});
	}
};

export const getUserCart: RequestHandler = async (req, res, next) => {
	try {
		console.log("in addusercar");
		let cart: ClientCart = new ClientCart();

		if (req.session.cart) {
			cart = await req.session.cart.getClientCart();
		}

		res.status(201).json({
			message: "Sent cart",
			cart,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "something went wrong",
			cart: new ClientCart(),
		});
	}
};

export const postDeleteItem: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.body;

		if (!req.session.cart) {
			throw new Error("Cart couldn't be found");
		}
		
		req.session.cart.deleteOne(id);
		req.session.save();

		res.status(201).json({ message: "Item was removed", removed: true });
	} catch (err) {
		console.log(err);
		res.status(422).json({ message: "Something went wrong" });
	}
};
