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

Role.sync();

export async function getCostumerRole(){
	const costumerRole = await Role.findOrCreate({
		where: {
			role_name: "costumer"
		}
	});

	return costumerRole;
}

export async function getAdminRole(){
	const adminRole = await Role.findOrCreate({
		where: {
			role_name: "admin"
		}
	});

	return adminRole;
}
export default Role;
