import axios from "axios";
import React, { useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/layouts/Headers.module.scss";

import { RootState } from "../../store/root-store";
import { logout, Role } from "../../store/user-store";

const Header: React.FunctionComponent = () => {
	const dispatch = useDispatch();
	const isLogged = useSelector((state: RootState) => state.user.isLogged);
	const role = useSelector((state: RootState) => state.user.role);
	const cartLength = useSelector((state: RootState) => state.cart.length);

	let isAdmin = role === Role.admin;

	useEffect(() => {}, [isLogged, cartLength]);

	const logoutClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const req = await axios.get("/api/auth/logout");

		if (req.data) {
			dispatch(logout());
		}
	};

	return (
		<div className={styles.header}>
			<ul>
				<li>
					<Link to="/">HOME</Link>
				</li>
				<li>
					<Link to="/shop">SHOP</Link>
				</li>
				<li>
					<Link to="/cart">Cart Items: {cartLength}</Link>
				</li>
				{!isLogged && (
					<li>
						<a href={"http://localhost:4000/api/auth/login/google"}>
							Join using Google
						</a>
					</li>
				)}
				{isAdmin && (
					<li>
						<Link to="/admin">ADMIN</Link>
					</li>
				)}
				{isLogged && (
					<>
						<li>
							<Link to="/account">ACCOUNT</Link>
						</li>
						<button onClick={logoutClickHandler}>LOGOUT</button>
					</>
				)}
			</ul>
		</div>
	);
};

export default Header;
