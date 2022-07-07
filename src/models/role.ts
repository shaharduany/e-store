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

	return costumerRole[0];
}

export async function getAdminRole(){
	const adminRole = await Role.findOrCreate({
		where: {
			role_name: "admin"
		}
	});

	return adminRole[0];
}
export default Role;
