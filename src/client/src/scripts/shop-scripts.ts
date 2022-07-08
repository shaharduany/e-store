import axios from "axios";

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
