import axios from "axios";
import { updateCart } from "../store/cart-store";
import store from "../store/root-store";
import { login, UserI } from "../store/user-store";

export async function getUserInfo() {
	try{
		const config = {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		const userReq = await axios.get("/api/user/get-start-info", config);
		const data = userReq.data;
	
		if(!data || data.error || !data.email || !data.username || !data.role){
			console.log(data.message);
			return;
		}
		
		const user: UserI = {
			isLogged: true,
			email: data.email,
			role: data.role,
			username: data.username
		}
		store.dispatch(login(user));
		store.dispatch(updateCart(data.cart));
	} catch (err) {
		console.log(err);
	}
}

export async function getCartInfo(){
	try {
		const cartReq = await axios.get("/api/products/get-user-cart/", {
			headers: { "Content-Type" : "application/json" },
			withCredentials: true,
		});

		const data = cartReq.data;
		if(!data || !data.cart){
			console.log("aaa");
			return;
		}
		store.dispatch(updateCart(data.cart));
	} catch (e) {
		console.log(e);
	}
}
