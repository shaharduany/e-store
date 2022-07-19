import axios from "axios";
import React, { useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemReq } from "../../scripts/cart-scripts";
import { RootState } from "../../store/root-store";
import ShopItem from "../shop/shop-item";
import CartItem from "./cart-item";
import RemoveButton from "./remove-button";

const CartView: React.FC = () => {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const [message, setMessage] = useState("");
	const [displayItems, setDisplayItems] = useState(cartItems.getDisplayItems());

	useEffect(() => {
		setDisplayItems(cartItems.getDisplayItems());
	}, [cartItems]);

	const checkoutClickHandler = async(e: MouseEvent<HTMLButtonElement>) => {
		const req = await axios.get("/api/checkout");
		console.log(req);
	}
	return (
		<div>
			<h1>CART PAGE</h1>
			{message && <h3>{message}</h3>}
			{displayItems &&
				displayItems.map((value, index) => (
					<div key={index}>
						<CartItem
							title={value[0].title}
							description={value[0].description}
							price={value[0].price}
							id={value[0].id}
							item={value}
						/>
					</div>
				))}
			<ul>
				<li>
					<Link to="/shop">CONTINUE SHOPPING</Link>
				</li>
				{displayItems && (
					<li>
						<a href="http://localhost:4000/api/checkout">CHECKOUT</a>
					</li>
				)}
			</ul>
		</div>
	);
};

export default CartView;
