import axios from "axios";
import { removeItem } from "../store/cart-store";
import store from "../store/root-store";

export const deleteItemReq = async (id: number) => {
	try {
		const config = {
			Headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const body = { id };

		const req = await axios.post("/api/cart/delete-cart-item", body, config);
		const data = req.data;

		if (!data.removed) {
			throw new Error("couldn't remove");
		}

		store.dispatch(removeItem(id));
		return data.message;
	} catch (err) {
		console.log(err);
		return "something went wrong";
	}
};
