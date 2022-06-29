import express, { Express } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";


import productRouter from "./middlewware/products";
import userRouter from "./middlewware/user";
import swaggerDocument from "./lib/swagger";

import Role from "./models/role";
import User from "./models/user";
import Genre from "./models/genre";
import Product from "./models/product";
import Purchases from "./models/purchases";
import SessionStore, { session } from "./models/session";

export default class Server {
	private app: Express;
	private port: number | string;

	constructor() {
		this.port = process.env.PORT || 4000;
		this.app = express();
		this.extendtions();
		this.middleware();
		this.databaseSetup();
	}

	extendtions() {
		this.app.use(bodyParser.urlencoded());
		this.app.use(session);
	}
	
	async databaseSetup() {
		await Genre.sync();
		await Product.sync();
		await Role.sync();
		await User.sync();
		await Purchases.sync();
		await SessionStore.sync();
		
		console.log("started datbase");
	}

	middleware() {
		this.app.use(productRouter);
		this.app.use(userRouter);
		this.app.use(cors());
		this.app.use(
			"/api-docs",
			swaggerUI.serve,
			swaggerUI.setup(swaggerDocument)
		);
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`listening on port ${this.port}`);
		});
	}
}
