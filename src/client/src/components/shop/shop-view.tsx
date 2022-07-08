import React, { useEffect, useState } from "react";
import { getShopItems } from "../../scripts/shop-scripts";
import ShopItem from "./shop-item";

export interface ShopItemI {
	title: string;
	id: number;
	description: string;
	price: number;
	image?: string;
}

const ShopView: React.FunctionComponent = () => {
	const [products, setProducts] = useState<ShopItemI[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getShopItems()
			.then((items: ShopItemI[]) => {
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
					<ShopItem
						key={index}
						title={value.title}
						description={value.description}
						price={value.price}
						id={value.id}
					/>
				))}
		</div>
	);
};

export default ShopView;
