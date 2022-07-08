import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AdminPage from "./components/admin/main-view";
import Header from "./components/header";
import { getUserInfo } from "./scripts/auth-scripts";
const App: React.FC = () => {
	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<div>
			<Router>
				<Header />
				<div>
					<h1>header</h1>
				</div>
				<Routes>
					<Route path="/" element={<h1>home</h1>}></Route>
					<Route path="/admin" element={<AdminPage />}></Route>
	
				</Routes>
			</Router>
		</div>
	);
};

export default App;
