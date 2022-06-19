import pg, { QueryResult } from "pg";

const pool = new pg.Pool({
	user: "shahar",
	host: "localhost",
	database: "estore",
	password: "test",
	port: 5432,
});

export default pool;