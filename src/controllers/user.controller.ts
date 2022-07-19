import { RequestHandler } from "express";
import dotenv from 'dotenv';

import Role, { getAdminRole } from "../models/role";
import User from "../models/user";
import ServerCart from "../lib/user-cart";
import ClientCart, { CartItemsI, CartItemSingleI } from "../client/src/lib/cart";
import CartItem from "../models/cart-item";
import Purchases, { PurchaseItemsI } from "../models/purchases";
import Product from "../models/product";

dotenv.config();

async function cartItemProductConverter(items: number[]){
	let arr: CartItemSingleI[] = [];

	for(let id of items){
		const cartItem = await CartItem.findByPk(id);
		if(!cartItem){
			continue;
		}
		const product = await Product.findByPk(cartItem.getDataValue("product"));
		if(!product){
			continue;
		}
		arr.push([{
			title: product.getDataValue("title"),
			description: product.getDataValue("description"),
			price: product.getDataValue("price"),
			id: product.getDataValue("id")
		}, cartItem.getDataValue("amount")])
	}

	return arr;
}

async function converUserHisotory(history: number[]){
	let arr: PurchaseItemsI[] = [];
	console.log(arr);
	for(let id of history){
		const purchase = await Purchases.findByPk(id);
		if(!purchase){
			throw new Error("purchase not found");
		}
		let cartItems: number[] = purchase.getDataValue("products");
		const products: CartItemSingleI[] = await cartItemProductConverter(cartItems);
		console.log(products);
		arr.push({
			purchasedAt: purchase.getDataValue("purchased_at"),
			price: purchase.getDataValue("price"),
			products,
		})
	}

	return arr;
}


export const isUser = async (id: number) => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new Error("Couldn't find user at isUser");
	}

	return user;
};

export const userIsValid: RequestHandler = async (req, res, next) => {
	try {
		const isAuth = req.isAuthenticated();
		if (!isAuth) {
			throw new Error("test");
		}
	} catch (err) {
		res.status(401).json({
			message: "Couldn't find at isValidUser",
			error: err,
		});
		return;
	}
	next();
};

export const getUserHistory: RequestHandler = async(req, res, next) => {
	try {
		const user = await isUser(req.user!.id as number);
		const history = await converUserHisotory(user.getDataValue("history"));
	
		res.status(201).json({ message: "Sent user history", history });
	} catch (e) {
		res.status(422).json({ message: "something went wrong" });
		console.log(e);
	}
}

export const getUserInformation: RequestHandler = async (req, res, next) => {
	try {
		const userId = req.user?.id as number;
		const user = await isUser(userId);
		const email = user.getDataValue("email");
		const username = user.getDataValue("username");
		const image = user.getDataValue("image");
		const role = await Role.findByPk(user.getDataValue("role"));

		res.status(201).json({
			message: "Sent info",
			email,
			username,
			image,
			role,
		});
	} catch (err) {
		res.status(422).json({ message: "couldn't find user" });
	}
};

export const getStartUserInfo: RequestHandler = async (req, res, next) => {
	const user = await isUser(req.user?.id!);
	const role = await Role.findByPk(user.getDataValue("role"));

	const cart: ClientCart = await req.session.cart!.getClientCart();

	res.status(200).json({
		message: "sent info",
		username: user.getDataValue("username"),
		email: user.getDataValue("email"),
		role: role?.getDataValue("role_name"),
		image: user.getDataValue("image"),
		cart,
	});
};

export const postBuyProducts: RequestHandler = async (req, res, next) => {
	//get body here
	try {
		const cart = req.session.cart!.convertToArray();
		const userId = req.user?.id;
		if (!userId) {
			throw new Error("no user id found");
		}

		const user = await isUser(userId);
		let arr: number[] = [];
		for (let item of cart) {
			const cartItem = await CartItem.create({
				product: item[0],
				amount: item[1],
			});
			arr.push(cartItem.getDataValue("id"));
		}

		const pruchase = await Purchases.create({
			products: arr,
			buyer: user.getDataValue("id"),
		});

		await user.update(
			"history",
			user.getDataValue("history").push(pruchase.getDataValue("id"))
		);
		console.log("got here");
		res.redirect(`${process.env.CLIENT_URL}/checkout/success`);
	} catch (e) {
		console.log(e);
	}
};
