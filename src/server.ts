import express, { Express } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";
import passport from "passport";

import productRouter from "./middlewware/products.router";
import authRoter from "./middlewware/auth.router";
import adminRouter from "./middlewware/admin.router";
import userRouter from "./middlewware/user.router";
import cartRouter from "./middlewware/cart.router";
import checkoutRouter from "./middlewware/checkout.router";

import swaggerDocument from "./lib/swagger";
import { session } from "./models/session";

import "./models/role";
import "./models/user";
import "./models/genre";
import "./models/session";
import "./models/cart-item";
import "./models/product";
import "./models/purchases";

import "./middlewware/auth.router";

import sequelize from "./models/pg-sequelize";
import cookieParser from "cookie-parser";
import { SECRET } from "./lib/secrets";

export default class Server {
	private app: Express;
	private port: number | string;

	constructor() {
		this.port = 4000;
		this.app = express();

		this.extendtions();
		this.middleware();
	}

	extendtions() {
		this.app.use(bodyParser.urlencoded());
		this.app.use(bodyParser.json());

		this.app.use(session);
		this.app.use(cookieParser());

		this.app.use(passport.initialize());
		this.app.use(passport.session());

		this.app.use(cors());
		this.app.use(
			"/api-docs",
			swaggerUI.serve,
			swaggerUI.setup(swaggerDocument)
		);
	}

	async databaseSetup() {
		sequelize.sync();
		console.log("started datbase");
	}

	middleware() {
		this.app.use(productRouter);
		this.app.use(authRoter);
		this.app.use(adminRouter);
		this.app.use(userRouter);
		this.app.use(cartRouter);
		this.app.use(checkoutRouter);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`listening on port ${this.port}`);
		});
	}
}
