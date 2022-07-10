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
				cartItems.getDisplayItems().map((value, index) => (
					<div key={index}>
                        <CartItem 
                            title={value[0].title}
                            description={value[0].description}
                            price={value[0].price}
                            id={value[0].id}
							amount={value[1]}
                        />
					</div>
				))}
		</div>
	);
};

export default CartView;
