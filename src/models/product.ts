import sequelize from "./pg-sequelize";
import { Model, DataTypes } from "sequelize";

class Product extends Model {}
/**
 *
 */
Product.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		genre: {
			type: DataTypes.INTEGER,
			references: {
				model: "genre",
				key: "id",
			},
		},
		image: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "product",
		indexes: [
			{
				fields: ["genre"],
				using: "BTREE",
			},
            {
                fields: ["title"],
                using: "gin",
                unique: true,
            },
		],
	}
);

export default Product;
