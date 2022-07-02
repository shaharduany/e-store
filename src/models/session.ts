import sequelize from "./pg-sequelize";
import store from "connect-session-sequelize";
import buildSession from "express-session";
import { Model, DataTypes } from "sequelize";

const SessionStore = store(buildSession.Store);

class Session extends Model {}

Session.init(
	{
		sid: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		expires: {
			type: DataTypes.DATE,
		},
		data: {
			type: DataTypes.JSON,
			defaultValue: {},
		},
	},
	{
		sequelize,
		indexes: [
			{
				fields: ["sid"],
				using: "BTREE",
				name: "session_id_index",
			},
		],
	}
);

const mySessionStore = new SessionStore({
	db: sequelize,
	table: "Sessions"
});

export const session = buildSession({
	secret: "mysecret",
	resave: false,
	saveUninitialized: false,
	store: mySessionStore,
});

export default Session;
