import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { postProduct } from "../../scripts/admin-scripts";
import { RootState } from "../../store/root-store";
import { Role } from "../../store/user-store";

const AdminPage: React.FunctionComponent = () => {
	const navigate = useNavigate();

	const prodNameInputRef = useRef<HTMLInputElement>(null);
	const prodDescRef = useRef<HTMLInputElement>(null);
	const prodPriceRef = useRef<HTMLInputElement>(null);
	const prodGenreRef = useRef<HTMLInputElement>(null);

	const [message, setMessage] = useState("");
	const role = useSelector((state: RootState) => state.user.role);
	if (role !== Role.admin) {
		console.log(role);
		return (
			<div>
				<h1>! ADMIN</h1>
			</div>
		);
	}
	const productSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const title = prodNameInputRef.current?.value;
		const description = prodDescRef.current?.value;
		const genre = prodGenreRef.current?.value;
		const price = Number(prodPriceRef.current?.value);

		if (!title || !description || !genre || !price) {
			setMessage("all fields are important");
			return;
		}

		const reqMessage = await postProduct(title, description, genre, price);
		setMessage(reqMessage);
	};

	return (
		<div>
			<h1>admin panel</h1>
			{message && <h4>{message}</h4>}
			<form onSubmit={productSubmitHandler}>
				<div>
					<label htmlFor="product-name">Name of product</label>
					<input id="product-name" type="text" ref={prodNameInputRef} />
				</div>
				<div>
					<label htmlFor="description">Product Description</label>
					<input id="description" type="textarea" ref={prodDescRef} />
				</div>
				<div>
					<label htmlFor="price">Price: </label>
					<input id="price" type="number" ref={prodPriceRef} />
				</div>
				<div>
					<label htmlFor="genre">Genre: </label>
					<input id="genre" type="text" ref={prodGenreRef} />
				</div>
				<div>
					<button type="submit">POST</button>
				</div>
			</form>
		</div>
	);
};

export default AdminPage;
