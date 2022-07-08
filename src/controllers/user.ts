import { RequestHandler } from "express";
import Role, { getAdminRole } from "../models/role";
import User from "../models/user";

export const isUser = async (id: number) => {
	const user = await User.findByPk(id);
	if (!user) {
		throw new Error("Couldn't find user");
	}

	return user;
};

export const userIsValid: RequestHandler = async (req, res, next) => {
	const userId = req.user?.id;
	try {
		if (!userId) {
			throw new Error("UserID doesn't exist");
		}

		const user = await isUser(userId);
		if(!user){
			throw new Error("couldn't find user");
		}
	} catch (err) {
		res.status(401).json({
			message: "Couldn't find user",
			error: err
		});
		return;
	}
	next();
};

export const getUserInformation: RequestHandler = async (req, res, next) => {
	const userId = req.user?.id as number;
	try {
		const user = await isUser(userId);
		const email = user.getDataValue("email");
		const username = user.getDataValue("username");
		const history = user.getDataValue("history");

		res.status(201).json({
			message: "Sent info",
			email,
			username,
			history,
		});
	} catch (err) {
		res.status(422).json({ message: "couldn't find user" });
	}
};

export const getStartUserInfo: RequestHandler = async(req, res, next) => {
	const user = await isUser(req.user?.id!);
	const role = await Role.findByPk(user.getDataValue("role"));

	res.status(200).json({
		message: "sent info",
		username: user.getDataValue("username"),
		email: user.getDataValue("email"),
		role: role?.getDataValue(("role_name"))
	});
}

export const postBuyProducts: RequestHandler = async(req, res, next) => {
    
}