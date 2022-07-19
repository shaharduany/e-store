import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../store/root-store";

const AccountComp: React.FC = () => {
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.user);
	const { isLogged, username, email, role } = user;

	useEffect(() => {
		if (!isLogged) {
			navigate("/");
		}
	}, [isLogged, navigate]);

	return (
		<div>
            <h2>INFO</h2>
			<h3>Username: {username}</h3>
			<p>
				Email: {email} Role: {role}
			</p>
		</div>
	);
};

export default AccountComp;