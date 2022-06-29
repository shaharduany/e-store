import sequelize from "./pg-sequelize";
import { Model, DataTypes } from "sequelize";

class Role extends Model {}

Role.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		role_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ sequelize, modelName: "roles" }
);

export default Role;
