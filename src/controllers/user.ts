import { json } from "body-parser";
import { RequestHandler } from "express";
import { ShopItemI } from "../client/src/components/shop/shop-view";
import Product from "../models/product";
import Role, { getAdminRole } from "../models/role";
import User from "../models/user";

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
	const cartItems = req.session.cart ? req.session.cart : [];

	const cart = await getCartItemsById(cartItems);

	res.status(200).json({
		message: "sent info",
		username: user.getDataValue("username"),
		email: user.getDataValue("email"),
		role: role?.getDataValue("role_name"),
		cart,
	});
};

function convertProdShopItem(product: Product) {
	let obj: ShopItemI = {
		title: product.getDataValue("title"),
		description: product.getDataValue("description"),
		price: product.getDataValue("price"),
		id: product.getDataValue("id"),
	};
	return obj;
}

async function getCartItemsById(ids: number[]) {
	const cart: ShopItemI[] = [];

	for (let id of ids) {
		let item = await Product.findByPk(id);
		if (!item) {
			continue;
		}
		cart.push(convertProdShopItem(item));
	}
	return cart;
}

export const postBuyProducts: RequestHandler = async (req, res, next) => {};

export const postDeleteItem: RequestHandler = async (req, res, next) => {
	try {
		const cart = req.session.cart;
		const { id } = req.body;

		if (!cart) {
			throw new Error("Cart couldn't be found");
		}
		req.session.cart = cart.filter((value) => value !== id);

		res.status(201).json({ message: "Item was removed", removed: true });
	} catch (err) {
		console.log(err);
		res.status(422).json({ message: "Something went wrong" });
	}
};
