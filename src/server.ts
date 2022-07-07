// I test this comment
import express, { Express } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";
import passport from "passport";

import productRouter from "./middlewware/products";
import authRoter from './middlewware/auth';
import swaggerDocument from "./lib/swagger";
import { session } from "./models/session";

import "./models/role";
import "./models/user";
import "./models/genre";
import "./models/product";
import "./models/purchases";
import "./models/session";
import "./middlewware/auth";

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
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	async databaseSetup() {
		sequelize.sync();
		console.log("started datbase");
	}

	middleware() {
		this.app.get("/", (req, res) => {
			console.log(req.user?.id);
			res.send(`<a href="/api/auth/login"> signup </a>`);
		});
		this.app.use(productRouter);
		this.app.use(authRoter);
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
