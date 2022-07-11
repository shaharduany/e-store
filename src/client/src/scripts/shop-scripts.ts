import axios from "axios";
import { ShopItemI } from "../components/shop/shop-view";
import { addItem } from "../store/cart-store";
import store from "../store/root-store";

const headers = { "Content-Type": "application/json" };

export const getShopItems = async (amount: number = 0) => {
	let url = "/api/products/";
	if (amount) {
		url += amount.toString();
	}

	const req = await axios.get(url);
	const data = req.data;

	console.log(data.messages);
	return data.products;
};

export const addToCart = async (item: ShopItemI) => {
	try {
		const req = await axios.post(
			"/api/cart/add-to-cart",
			{ id: item.id },
			{ headers, withCredentials: true }
		);
        
        if(!req.data.error){
            store.dispatch(addItem(item));
        }

        return req.data.message;
	} catch (err) {
        console.log(err);
        return "Something went wrong";
    }
};
