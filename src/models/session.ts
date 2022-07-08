import sequelize from "./pg-sequelize";
import store from "connect-session-sequelize";
import buildSession from "express-session";
import { Model, DataTypes } from "sequelize";
import { SECRET } from "../lib/secrets";

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
		user: {
			type: DataTypes.INTEGER,
			references: {
				model: "users",
				key: "id"

			}
		}
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
		modelName: "sessions"
	}
);

const mySessionStore = new SessionStore({
	db: sequelize,
	table: "sessions"
});

Session.sync();

export const session = buildSession({
	secret: SECRET,
	resave: true,
	saveUninitialized: true,
	store: mySessionStore,
	cookie: {
		maxAge: 3 * 24 * 60 * 60 * 1000,
	}
});

export default Session;
