import dotenv from "dotenv";
import { RequestHandler } from "express";
import { Stripe } from "stripe";
import ServerCart from "../lib/user-cart";
import CartItem from "../models/cart-item";
import Purchases from "../models/purchases";
import { isUser } from "./user.controller";

dotenv.config();
const STRIPE_KEY = process.env.STRIPE_KEY as string;
const URL = process.env.URL as string;
const CLIENT_URL = process.env.CLIENT_URL as string;
const stripe = new Stripe(STRIPE_KEY, {
	apiVersion: "2020-08-27",
});

export const getCheckout: RequestHandler = async (req, res, next) => {
	try {
		const clientCart = await await req.session.cart!.getClientCart();
		const items = clientCart.getDisplayItems();

		let stripSessionId = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: items.map((value, index) => {
				let item = value[0];
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: item.title,
						},
						unit_amount: item.price,
					},
					quantity: value[1],
				};
			}),
			mode: "payment",
			success_url: `${CLIENT_URL}/checkout/success`,
			cancel_url: `${CLIENT_URL}/checkout/fail`,
		});

		if (!stripSessionId.url) {
			res.json({ message: "something went wrong" });
			return;
		}

		req.session.stripeSessionId = stripSessionId;
		res.redirect(stripSessionId.url);
	} catch (e) {
		console.log(e);
	}
};

export const getSuccessCheckout: RequestHandler = async (req, res, next) => {
	try {
		const userId = req.user!.id;
		if (!userId) {
			throw new Error("User not found");
		}
		await assignCartHistory(userId, req.session.cart!);
		req.session.cart = new ServerCart();
		res.status(201).json({ message: "Request proccessed" });
	} catch (e) {
		console.log(e);
		res.redirect(`${CLIENT_URL}/checkout/fail`);
	}
};

export const getcHECKOUTFail: RequestHandler = async(req, res, next) => {
	res.redirect(`${CLIENT_URL}/checkout/fail`);
}

async function assignCartHistory(userId: number, cart: ServerCart) {
	const user = await isUser(userId);
	if (!user) {
		throw new Error("user not found at isUser");
	}
	const serverCartArr = cart.convertToArray();
	let cartItemArr: number[] = [];

	for (let item of serverCartArr) {
		const cartItem = await CartItem.create({
			product: item[0],
			amount: item[1],
		});
		cartItemArr.push(cartItem.getDataValue("id"));
	}
	
	const purchase = await Purchases.create({
		products: cartItemArr,
		buyer: userId,
	});
	
	const purchaseId = +purchase.getDataValue("id");
	const history = user.getDataValue("history");
	history.push(purchaseId);
	
	await user.set(
		"history",
		history	
	);
	await purchase.save();
	await user.save();
}

// try {
// 	const cart = req.session.cart!.convertToArray();
// 	const userId = req.user?.id;
// 	if (!userId) {
// 		throw new Error("no user id found");
// 	}

// 	const user = await isUser(userId);
// 	let arr: number[] = [];
// 	for (let item of cart) {
// 		const cartItem = await CartItem.create({
// 			product: item[0],
// 			amount: item[1],
// 		});
// 		arr.push(cartItem.getDataValue("id"));
// 	}

// 	const pruchase = await Purchases.create({
// 		products: arr,
// 		buyer: user.getDataValue("id"),
// 	});

// 	await user.update(
// 		"history",
// 		user.getDataValue("history").push(pruchase.getDataValue("id"))
// 	);
// 	console.log("got here");
// 	res.redirect(`${process.env.CLIENT_URL}/checkout/success`);
// } catch (e) {
// 	console.log(e);
// }
