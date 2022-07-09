import React from "react";
import ShopItem from "../shop/shop-item";
import { ShopItemI } from "../shop/shop-view";
import RemoveButton from "./remove-button";

const CartItem: React.FunctionComponent<ShopItemI> = (props: ShopItemI) => {
	const { id, title, description, price } = props;

	return (
		<div>
			<ShopItem id={id} title={title} description={description} price={price} />
			<RemoveButton id={id} />
		</div>
	);
};

export default CartItem;