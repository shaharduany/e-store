import { RequestHandler } from "express";
import Genre from "../models/genre";
import Product from "../models/product";
import { getAdminRole } from "../models/role";
import User from "../models/user";
import { isUser } from "./user.controller";

export const isAdmin: RequestHandler = async (req, res, next) => {
	const userId = req.user?.id;
	const adminRole = await getAdminRole();
	let user: User;
	
	try {
		if (!userId) {
			throw new Error("Unauthorized request");
		}
        
        user = await isUser(userId);

		if (!user || user.getDataValue("role") !== adminRole.getDataValue("id")) {
			throw new Error("Unauthorized request");
		}
	} catch (e) {
		res.status(401).json({
			message: "user unauthorized",
			error: e,
		});
		return;
	}
	next();
};

export const postProductAdmin: RequestHandler = async (req, res, next) => {
	const { genre, title, description, price } = req.body;
	//console.log(req.body);
	if (!genre || !title || !description || !price) {

		res.status(422).json({
			message: "Must fill all required fields",
		});
		return;
	}

    const genreCreated = await createProductAsAdmin(
		title,
		description,
		price,
		genre
	);

	res.status(201).json({
		message: "Product added",
		genreCreated,
	});
};

async function createProductAsAdmin(
	title: string,
	description: string,
	price: number,
	genre: string
) {
	const [genreMod, genreCreated] = await Genre.findOrCreate({
		where: {
			name: genre.toLocaleLowerCase(),
		},
	});

	const product = await Product.create({
		title,
		description,
		price,
		genre: genreMod.getDataValue("id"),
	});
	return genreCreated;
}