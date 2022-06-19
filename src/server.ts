import express, { Express } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import router from "./middlewware/products";
import Database from "./lib/database";
import swaggerDocument from "./lib/swagger";

export default class Server {
	private app: Express;
	private port: number | string;
	private database: Database;

	constructor() {
		this.port = process.env.PORT || 4000;
		this.app = express();

		this.middleware();
		this.database = new Database();
		this.database.startup();
	}

	middleware() {
		this.app.use(router);
		this.app.use(cors());
        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    }

	listen() {
		this.app.listen(this.port, () => {
			console.log(`listening on port ${this.port}`);
		});
	}
}
