import { SessionData } from "express-session";
import { UserI } from "../models/user";

declare global {
	namespace Express {
		interface User extends UserI {}
	}
}

declare module "express-session" {
	interface SessionData {
		isLogged: boolean;
	}
}
