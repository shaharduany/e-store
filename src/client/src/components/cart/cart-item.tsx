import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartItemsI, CartItemSingleI } from "../../lib/cart";
import ShopItem from "../shop/shop-item";
import { ShopItemI } from "../shop/shop-view";
import CartActions from "./cart-actions";
import RemoveButton from "./remove-button";

interface CartItemCompI extends ShopItemI {
	item: CartItemSingleI;
}

const CartItem: React.FunctionComponent<CartItemCompI> = (props: CartItemCompI) => {
	const { id, title, description, price, item } = props;
	return (
		<div>
			<ShopItem id={id} title={title} description={description} price={price} />
			<CartActions item={item} />
		</div>
	);
};

export default CartItem;