import React from "react";
import { ShopItemI } from "./shop-view";
import styles from '../../styles/components/shop/Shop.module.scss'

const ShopItem: React.FC<ShopItemI> = (props: ShopItemI) => {
	const { title, description, price} = props;

	return (
		<div className={styles.shopItem}>
			<div>
				<h3>{title}</h3>
			</div>
			<div>
				<p>{description}</p>
			</div>
			<div>
				{price > 0 && <p>Price: {price}</p>}
			</div>
		</div>
	);
};

export default ShopItem;
