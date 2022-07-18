import { StringExpressionOperatorReturningArray } from "mongoose";
import { ShopItemI } from "../client/src/components/shop/shop-view";
import ClientCart from "../client/src/lib/cart";
import Product from "../models/product";

export interface CartI {
	[key: number]: number;
}

class ServerCart {
	items: CartI;

	constructor(items: CartI = {}, cart: ServerCart | undefined = undefined) {
		if (cart) {
			this.items = cart.items;
		} else {
			this.items = items;
		}
	}

	private checkItemInCart(item: ShopItemI | number) {
		if (typeof item !== "number") {
			item = item.id;
		}
		if (this.items[item] === undefined) {
			this.items[item] = 0;
		}
	}

	insertOne(item: ShopItemI | number) {
		this.checkItemInCart(item);
		if (typeof item !== "number") {
			item = item.id;
		}
		this.items[item] += 1;
	}

	deleteOne(item: ShopItemI | number) {
		if (typeof item !== "number") {
			item = item.id;
		}

		if (this.items[item] > 1) {
			this.items[item] -= 1;
		} else {
			delete this.items[item];
		}
	}
	async getClientCart() {
		const ids: string[] | number[] = Object.keys(this.items);
		const cart: ClientCart = new ClientCart();
		for (let i = 0; i < ids.length; i++) {
			let id: string | number = ids[i];

			if (typeof id !== "number") {
				// TypeScript complains
				id = Number(id);
			}

			const product = await Product.findByPk(id);
			if (!product) {
				continue;
			}

			const item = this.convertProdShopItem(product);
			cart.insertMany(item, this.items[id]);
		}
		return cart;
	}

	private convertProdShopItem(product: Product) {
		let obj: ShopItemI = {
			title: product.getDataValue("title"),
			description: product.getDataValue("description"),
			price: product.getDataValue("price"),
			id: product.getDataValue("id"),
		};
		return obj;
	}

	convertToArray() {
		let arr: [number, number][] = [];
		let ids = Object.keys(this.items);

		for (let i = 0; i < ids.length; i++) {
			let id = +ids[i];

			arr.push([id, this.items[id]]);
		}

		return arr;
	}
}

export default ServerCart;
