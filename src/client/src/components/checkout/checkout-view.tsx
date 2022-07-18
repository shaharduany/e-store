import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CheckoutPageI {
	success: boolean;
}

const CheckoutPage: React.FC<CheckoutPageI> = (props: CheckoutPageI) => {
	const { success } = props;
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(success){
            axios.get("/api/checkout/success", { withCredentials: true}).then((res) => setMessage(res.data.message));
        }
    }, [success])
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
