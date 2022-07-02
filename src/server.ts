// I test this comment
import express, { Express } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";

import productRouter from "./middlewware/products";
import userRouter from "./middlewware/user";
import swaggerDocument from "./lib/swagger";
import { session } from "./models/session";

import Role from "./models/role";
import User from "./models/user";
import Genre from "./models/genre";
import Product from "./models/product";
import Purchases from "./models/purchases";
import Session from "./models/session";

import sequelize from "./models/pg-sequelize";

export default class Server {
	private app: Express;
	private port: number | string;

	constructor() {
		this.port = 4000;
		this.app = express();
		this.databaseSetup();
		this.extendtions();
		this.middleware();
	}

	extendtions() {
		this.app.use(bodyParser.urlencoded());
		this.app.use(session);
	}

	async databaseSetup() {
		await sequelize.sync();
		setTimeout(() => {}, 500)
		console.log("started datbase");
	}

	middleware() {
		this.app.get("/", (req, res) => {
			console.log("here");
			req.session.isLogged = true;
			req.session.save();
			res.send("saved");
			console.log("Saved");
		})
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
