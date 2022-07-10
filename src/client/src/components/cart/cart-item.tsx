import React from "react";
import ShopItem from "../shop/shop-item";
import { ShopItemI } from "../shop/shop-view";
import RemoveButton from "./remove-button";

interface CartItemI extends ShopItemI {
	amount: number;
}

const CartItem: React.FunctionComponent<CartItemI> = (props: CartItemI) => {
	const { id, title, description, price, amount } = props;

	return (
		<div>
			<ShopItem id={id} title={title} description={description} price={price} />
			<p>{amount}</p>
			<RemoveButton id={id} />
		</div>
	);
};

export default CartItem;