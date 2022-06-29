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
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			allowNull: false,
		},
		buyer: {
			type: DataTypes.INTEGER,
			references: {
				model: "users",
				key: "id",
			},
		},
		price: DataTypes.FLOAT,
		purchased_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		}
	},
	{
		sequelize,
		modelName: "purchases",
	}
);

export default Purchases;
