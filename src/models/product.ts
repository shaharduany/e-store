import sequelize from "./pg-sequelize";
import { Model, DataTypes } from "sequelize";
import { prod_tt_sasportal } from "googleapis/build/src/apis/prod_tt_sasportal";

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
				model: "genres",
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
				using: "BTREE",
            },
		],
	}
);

Product.sync();

export default Product;
