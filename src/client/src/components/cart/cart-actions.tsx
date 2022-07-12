import React, { useEffect, useState } from "react";
import { CartItemSingleI } from "../../lib/cart";
import RemoveButton from "./remove-button";

interface CartActionI {
	item: CartItemSingleI;
}

const CartActions: React.FC<CartActionI> = (props: CartActionI) => {
	const { id } = props.item[0];
	const [amount, setAmount] = useState(props.item[1]);

	useEffect(() => {
		setAmount(props.item[1]);
	}, [props.item]);

	return (
		<div>
			<p>Amount: {amount}</p>
			<RemoveButton id={id} />
		</div>
	);
};

export default CartActions;