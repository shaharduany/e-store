import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../scripts/auth-scripts";
import { resetCart } from "../../store/cart-store";

interface CheckoutPageI {
	success: boolean;
}

const CheckoutPage: React.FC<CheckoutPageI> = (props: CheckoutPageI) => {
	const { success } = props;
    const [message, setMessage] = useState("");
	const dispatch = useDispatch();

    useEffect(() => {
        if(success){
          //  axios.get("/api/checkout/success", { withCredentials: true}).then((res) => setMessage(res.data.message));
			dispatch(resetCart());
		}
    }, [])
	return (
		<div>
			<h1>CHECKOUT PAGE</h1>
			{message && <h4>{message}</h4>}
            {success && (
				<div>
					<h3>Checkout complete</h3>
					<p>
						<Link to="/">Go back home</Link>
					</p>
				</div>
			)}
			{!success && (
				<div>
					<h3>Checkout failed</h3>
					<p>
						<Link to="/">Go back to cart</Link> and try again
					</p>
				</div>
			)}
		</div>
	);
};

export default CheckoutPage;
