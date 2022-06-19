import express, { Express } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import productRouter from "./middlewware/products";
import userRouter from './middlewware/user';
import swaggerDocument from "./lib/swagger";

export default class Server {
	private app: Express;
	private port: number | string;

	constructor() {
		this.port = process.env.PORT || 4000;
		this.app = express();

		this.middleware();
	}

	middleware() {
		this.app.use(productRouter);
		this.app.use(userRouter);
		this.app.use(cors());
        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    }

	listen() {
		this.app.listen(this.port, () => {
			console.log(`listening on port ${this.port}`);
		});
	}
}
