import axios from "axios";
import React, { useEffect, useState } from "react";
import HistoryItem, { HistoryItemI } from "./history-iten";

const HistoryComp: React.FC = () => {
	const [deals, setDeals] = useState<HistoryItemI[]>([]);

    useEffect(() => {
		axios
			.get("/api/user/get-user-history", { withCredentials: true })
			.then((res) => {
				setDeals(res.data.history);
			})
			.catch((e) => console.log(e));
	}, []);

	return (
		<>
			<h1>HISTORY</h1>
			{deals &&
				deals.map((value, index) => (
					<HistoryItem
						purchasedAt={value.purchasedAt}
						price={value.price}
						products={value.products}
						key={index}
					/>
				))}
		</>
	);
};

export default HistoryComp;
