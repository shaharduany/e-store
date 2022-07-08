import React, { useEffect, useState } from "react";
import { getShopItems } from "../../scripts/shop-scripts";

interface ShopItem {
	title: string;
	id: number;
	description: string;
	price: number;
	image?: string;
}

const ShopView: React.FunctionComponent = () => {
	const [products, setProducts] = useState<ShopItem[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getShopItems()
			.then((items: ShopItem[]) => {
				if (items.length === 0) {
					throw new Error("No items found");
				}
				setProducts(items);
			})
			.catch((err) => setMessage(err));
	}, []);

	return (
		<div>
			{message && <p>{message}</p>}
			{products &&
				products.map((value, index) => (
					<p key={index}>
						{value.title} {value.description}
						{value.price} {value.id}
					</p>
				))}
		</div>
	);
};

export default ShopView;
