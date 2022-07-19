import { Model, DataTypes } from "sequelize";
import { CartItemSingleI } from "../client/src/lib/cart";
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
			defaultValue: [],
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

Purchases.sync();

export interface PurchaseItemsI {
	price: number;
	purchasedAt: Date;
	products: CartItemSingleI[];
}

export default Purchases;
