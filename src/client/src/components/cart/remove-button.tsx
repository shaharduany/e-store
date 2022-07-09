import e from "express";
import React, { ButtonHTMLAttributes, MouseEvent } from "react";
import { deleteItemReq } from "../../scripts/cart-scripts";
import { ShopItemI } from "../shop/shop-view";

interface RemoveButtonI {
	id: number;
}

const RemoveButton: React.FC<RemoveButtonI> = (props: RemoveButtonI) => {
	const { id } = props;

	const removeItemHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const req = await deleteItemReq(id);
		console.log(req);
	};

	return (
		<div>
			<button onClick={removeItemHandler}>DELETE</button>
		</div>
	);
};

export default RemoveButton;
