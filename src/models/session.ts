import sequelize from "./pg-sequelize";
import store from "connect-session-sequelize";
import buildSession from "express-session";

const SessionStore = store(buildSession.Store);

const mySessionStore = new SessionStore({
	db: sequelize
});

export const session = buildSession({
	secret: "mysecret",
	resave: false,
	saveUninitialized: false,
	store: mySessionStore
});

export default mySessionStore;