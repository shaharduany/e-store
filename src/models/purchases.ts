import { Model, DataTypes } from "sequelize";
import sequelize from "./pg-sequelize";

class Purchases extends Model {}

Purchases.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		products: {
			type: DataTypes.ARRAY,
			allowNull: false,
		},
		buyer: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
		price: DataTypes.FLOAT,
	},
	{
		sequelize,
		modelName: "purchases",
	}
);

export default Purchases;
