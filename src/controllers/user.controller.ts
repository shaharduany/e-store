import { RequestHandler } from "express";
import dotenv from 'dotenv';

import Role, { getAdminRole } from "../models/role";
import User from "../models/user";
import ServerCart from "../lib/user-cart";
import ClientCart from "../client/src/lib/cart";
import CartItem from "../models/cart-item";
import Purchases from "../models/purchases";

dotenv.config();

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

export const getUserInformation: RequestHandler = async (req, res, next) => {
	try {
		const userId = req.user?.id as number;
		const user = await isUser(userId);
		const email = user.getDataValue("email");
		const username = user.getDataValue("username");
		const history = user.getDataValue("history");

		res.status(201).json({
			message: "Sent info",
			email,
			username,
			history,
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
