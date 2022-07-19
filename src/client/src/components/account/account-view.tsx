import { useSelector } from "react-redux";
import { Route, Router, Routes } from "react-router";
import { Link } from "react-router-dom";
import { RootState } from "../../store/root-store";
import { Role } from "../../store/user-store";
import AdminPage from "../admin/main-view";
import AccountComp from "./account-comp";
import HistoryComp from "./history-comp";

const AccountView: React.FC = () => {
	const user = useSelector((state: RootState) => state.user);
	const { username, email, role } = user;

	return (
		<div>
			<h1>ACCOUNT VIEW</h1>
			<ul>
				<li>
					<Link to="/account/">INFO</Link>
				</li>
				<li>
					<Link to="/account/history">HISTORY</Link>
				</li>
			</ul>
			<Routes>
				<Route path="/" element={<AccountComp />}></Route>
				<Route path="/history" element={<HistoryComp />}></Route>
			</Routes>
		</div>
	);
};

export default AccountView;
