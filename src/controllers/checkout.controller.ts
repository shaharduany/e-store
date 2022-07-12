import dotenv from "dotenv";
import { RequestHandler } from "express";
import { Stripe } from "stripe";

dotenv.config();
const STRIPE_KEY = process.env.STRIPE_KEY as string;
const URL = process.env.URL;

const stripe = new Stripe(STRIPE_KEY, {
	apiVersion: "2020-08-27",
});

export const getCheckout: RequestHandler = async (req, res, next) => {
	try {
		const clientCart = await await req.session.cart!.getClientCart();
		const items = clientCart.getDisplayItems();

		let stripeSessionId = await stripe.checkout.sessions.create({
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
			success_url: `${URL}/checkout/success`,
			cancel_url: `${URL}/checkout/success`,
		});
        
		if (!(stripeSessionId.url)) {
			res.json({ message: "something went wrong" });
			return;
		}
		res.redirect(stripeSessionId.url);
	} catch (e) {
		console.log(e);
	}
};

export const getSuccessCheckout: RequestHandler = async (req, res, next) => {
	const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);
	
	res.send(`<h1>success</h1>`);
}
