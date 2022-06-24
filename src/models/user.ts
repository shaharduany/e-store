import sequelize from "./pg-sequelize";
import { Model, DataTypes } from "sequelize";
import Role from "./role";

class User extends Model {}
/**
 * (
    id serial,
    username varchar(64),
    display_name varchar(64),
    email varchar(126),
    pwd_hash varchar(32),
    pwd_salt varchar(32),
    external_type varchar(16),
    external_id varchar(64),
    history INTEGER [],
    role INTEGER REFERENCES roles,
    PRIMARY KEY (id)
)
 */
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pwd_hash: DataTypes.STRING,
		pwd_salt: DataTypes.STRING,
		history: {
			type: DataTypes.ARRAY,
			defaultValue: [],
		},
		role: {
			type: DataTypes.INTEGER,
			references: {
				model: Role,
				key: "id",
			},
			defaultValue: 1,
		},
	},
	{
		sequelize,
		modelName: "user",
		indexes: [
			{
				fields: ["email"],
				unique: true,
			},
		],
	}
);

export default User;
