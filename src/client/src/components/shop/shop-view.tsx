import React, { useEffect, useState } from "react";
import { getShopItems } from "../../scripts/shop-scripts";
import AddButton from "./add-item";
import ShopItem from "./shop-item";
import styles from "../../styles/components/shop/Shop.module.scss";
import { Col, Row } from "react-flexbox-grid";

export interface ShopItemI {
	title: string;
	id: number;
	description: string;
	price: number;
	genre?: string;
	image?: string;
}

const ShopView: React.FunctionComponent = () => {
	const [products, setProducts] = useState<ShopItemI[]>([]);
	const [message, setMessage] = useState("");

	useEffect(() => {
		getShopItems()
			.then((items: ShopItemI[]) => {
				if (!items || items.length === 0) {
					throw new Error("No items found");
				}
				setProducts(items);
			})
			.catch((err) => setMessage(String(err)));
	}, []);

	return (
		<div className={styles.shop}>
			{message && <p>{message}</p>}
			{products &&
				products.map((value, index) => (
					<Row key={index}>
						<Col>
							<ShopItem
								title={value.title}
								description={value.description}
								price={0}
								id={value.id}
								genre={value.genre}
							/>
						</Col>
						<Col>
							<AddButton item={value} />
						</Col>
					</Row>
				))}
		</div>
	);
};

export default ShopView;
