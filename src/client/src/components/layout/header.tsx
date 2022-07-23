import axios from "axios";
import React, { useEffect, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col } from "react-flexbox-grid";
import styles from "../../styles/components/layouts/Headers.module.scss";

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
				<Row around="lg">
					<Col >
					<ul>
						<li>
							<Link to="/">HOME</Link>
						</li>
						<li>
							<Link to="/shop">SHOP</Link>
						</li>
					</ul>
					</Col>
					<Col>
						<ul>
						<li>
							<Link to="/cart">CART: {cartLength}</Link>
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
								<li>
									<button onClick={logoutClickHandler}>LOGOUT</button>
								</li>
							</>
						)}
						</ul>
					</Col>
				</Row>
		</div>
	);
};

export default Header;
