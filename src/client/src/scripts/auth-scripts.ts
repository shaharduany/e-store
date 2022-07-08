import axios from "axios";
import { updateCart } from "../store/cart-store";
import store from "../store/root-store";
import { login, UserI } from "../store/user-store";

export async function getUserInfo() {
	try{
		const req = await axios.get("/api/user/get-start-info", {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		});
		const data = req.data;
	
		if(!data || data.error || !data.email || !data.username || !data.role){
			console.log(data.message);
			return;
		}
	
		const cart = data.cart;
	
		const user: UserI = {
			isLogged: true,
			email: data.email,
			role: data.role,
			username: data.username
		}
		console.log(data);
	
		store.dispatch(login(user));
		store.dispatch(updateCart(cart));
	} catch (err) {
		console.log(err);
	}
}
