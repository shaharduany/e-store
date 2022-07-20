import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AccountView from "./components/account/account-view";
import AdminPage from "./components/admin/main-view";
import CartView from "./components/cart/cart-view";
import CheckoutPage from "./components/checkout/checkout-view";
import Header from "./components/layout/header";
import ShopView from "./components/shop/shop-view";


const App: React.FC = () => {
	return (
		<div>
			<Router>
				<div>
					<Header />
				</div>
				<Routes>
					<Route path="/" element={<h1>home</h1>}></Route>
					<Route path="/admin" element={<AdminPage />}></Route>
					<Route path="/shop" element={<ShopView />}></Route>
					<Route path="/cart" element={<CartView />}></Route>
					<Route path="/account/*" element={<AccountView />}></Route>
					<Route
						path="/checkout/success"
						element={<CheckoutPage success={true} />}
					></Route>
					<Route
						path="/checkout/fail"
						element={<CheckoutPage success={false} />}
					></Route>
				</Routes>
			</Router>
		</div>
	);
};

export default App;
