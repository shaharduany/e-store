import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminPage from "./components/admin/main-view";
import Header from "./components/layout/header";
import ShopView from "./components/shop/shop-view";
import { getUserInfo } from "./scripts/auth-scripts";
const App: React.FC = () => {
	useEffect(() => {
		getUserInfo();
	}, []);

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
				</Routes>
			</Router>
		</div>
	);
};

export default App;
