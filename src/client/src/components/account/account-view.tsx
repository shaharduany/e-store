import { useSelector } from "react-redux";
import { RootState } from "../../store/root-store";
import { Role } from "../../store/user-store";
import AdminPage from "../admin/main-view";

const AccountView: React.FC = () => {
	const user = useSelector((state: RootState) => state.user);
	const { username, email, role } = user;

	return (
		<div>
			<h1>ACCOUNT VIEW</h1>
			<h4>Welcome {username}</h4>
			<p>Email: {email}</p>
			{role === Role.admin && <p>Admin</p>}
		</div>
	);
};

export default AccountView;