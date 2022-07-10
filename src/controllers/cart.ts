import { RequestHandler } from "express";
import Product from "../models/product";
import { ShopItemI } from "../client/src/components/shop/shop-view";

export interface CartI {
    [key: number]: number;
}

export interface ClientCartI {
    [key: number]: [ShopItemI, number]; 
}

export const postAddItemToCart: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.body;
		const product = await Product.findByPk(id);

		if (!product) {
			throw new Error("Product wasn't found");
		}

		if (!req.session.cart) {
			req.session.cart = {};
		}

        if(!req.session.cart[id]){
            req.session.cart[id] = 0;
        }
        
        req.session.cart[id] += 1;
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
		let cart: ClientCartI = {};

		if (!req.session.cart) {
            res.status(201).json({
                message: "no cart yet",
                cart,
            });
            return;
        }

        cart = await getCartItemsById(req.session.cart);

		res.status(201).json({
			message: "Sent cart",
			cart,
		});
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: "something went wrong",
			cart: {},
		});
	}
};

export const postDeleteItem: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.body;

		if (!req.session.cart) {
			throw new Error("Cart couldn't be found");
		}

        if(req.session.cart[id] > 1){
            req.session.cart[id] -= 1;
        } else {
            delete req.session.cart[id];
        }
		res.status(201).json({ message: "Item was removed", removed: true });
	} catch (err) {
		console.log(err);
		res.status(422).json({ message: "Something went wrong" });
	}
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

export async function getCartItemsById(items: CartI) {
    const ids = Object.keys(items)!;
    const cart: ClientCartI = {};

    for(let id of ids){
        if(typeof id !== "number"){
            continue;
        }

        const product = await Product.findByPk(id);
        if(!product){
            continue;
        }
        
        cart[id] = [convertProdShopItem(product), items[id]];
    }

    return cart;
}