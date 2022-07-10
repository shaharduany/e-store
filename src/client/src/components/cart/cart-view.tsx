import React, { useEffect, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { deleteItemReq } from "../../scripts/cart-scripts";
import { RootState } from "../../store/root-store";
import ShopItem from "../shop/shop-item";
import CartItem from "./cart-item";
import RemoveButton from "./remove-button";

const CartView: React.FC = () => {
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const [message, setMessage] = useState("");
    
	useEffect(() => {}, [cartItems]);
	return (
		<div>
			<h1>CART PAGE</h1>
			{message && <h3>{message}</h3>}
			{cartItems &&
				cartItems.for((value, index) => (
					<div key={index}>
                        <CartItem 
                            title={value.title}
                            description={value.description}
                            price={value.price}
                            id={value.id}
                        />
					</div>
				))}
		</div>
	);
};

export default CartView;
