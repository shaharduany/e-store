import axios from "axios";
import store from "../store/root-store";
import { login, UserI } from "../store/user-store";

export async function getUserInfo() {
	const req = await axios.get("/api/user/get-start-info", {
		headers: { "Content-Type": "application/json" },
	});
	const data = req.data;

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
}
