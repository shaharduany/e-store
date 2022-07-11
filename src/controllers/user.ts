import { RequestHandler } from "express";

import Role, { getAdminRole } from "../models/role";
import User from "../models/user";
import ServerCart from "../lib/user-cart";
import ClientCart from "../client/src/lib/cart";

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

export const postBuyProducts: RequestHandler = async (req, res, next) => {};
