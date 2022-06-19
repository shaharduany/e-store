import pg, { QueryResult } from "pg";

export interface CbFuncParams {
	error?: Error;
	result?: QueryResult;
}

export const pool = new pg.Pool({
	user: "shahar",
	host: "localhost",
	database: "estore",
	password: "test",
	port: 5432,
});

function query(queryString: string, cbFunc: (arg0: CbFuncParams) => any) {
	pool.query(queryString, (error, results) => {
		let obj: CbFuncParams = {};
		if (error) {
			obj.error = error;
		}
		if (results) {
			obj.result = results;
		}
		cbFunc(obj);
	});
}

export default query;
