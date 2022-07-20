import React, { useState, MouseEvent } from "react";
import { CartItemSingleI } from "../../../lib/cart";
import ShopItem from "../../shop/shop-item";

export interface HistoryItemI {
	purchasedAt: string;
	price: number;
	products: CartItemSingleI[];
}
const HistoryItem: React.FC<HistoryItemI> = (props: HistoryItemI) => {
	const [display, setDisplay] = useState(false);
	const { purchasedAt, price, products } = props;

	const showDealClicHandler = (e: MouseEvent<HTMLButtonElement>) => {
		setDisplay(!display);
	};

	return (
		<>
			<p>
				Purchased at: {purchasedAt} <br /> Price: {price}
			</p>
			{!display && <button onClick={showDealClicHandler}>MORE DETAILS</button>}
			{display &&
				products &&
				products.map((value, index) => (
					<div key={index}>
						<ShopItem
							title={value[0].title}
							description={value[0].description}
							price={value[0].price}
							id={value[0].id}
						/>
						<p>Amount: {value[1]}</p>
					</div>
				))}
                {display && <button onClick={showDealClicHandler}>conceal deal</button>}
		</>
	);
};

export default HistoryItem;
