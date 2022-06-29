import sequelize from "./pg-sequelize";
import { Model, DataTypes } from "sequelize";

class Genre extends Model {}
Genre.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: "genre",
		indexes: [
			{
				fields: ["name"],
				using: "BTREE",
			},
		],
	}
);

export default Genre;
