import React, { MouseEvent, useState } from "react";
import { addToCart } from "../../scripts/shop-scripts";
import { ShopItemI } from "./shop-view";

export interface AddButtonI {
	item: ShopItemI
}

const AddButton: React.FC<AddButtonI> = (props: AddButtonI ) => {
	const { item } = props;
	const [message, setMessage] = useState("");

	const purchaseClickHanlder = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setMessage(await addToCart(item));
	};

	return (
		<div>
			{message && (
				<div>
					<h5>{message}</h5>
				</div>
			)}
			<div>
				<p>Genre: {item.genre}</p>
				<p>Price: {item.price}</p>
				<button onClick={purchaseClickHanlder}>ADD ITEM</button>
			</div>
		</div>
	);
};

export default AddButton;
