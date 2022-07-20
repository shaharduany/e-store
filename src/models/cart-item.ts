import { DataTypes, Model } from "sequelize";
import sequelize from "./pg-sequelize";

class CartItem extends Model {};

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product: {
        type: DataTypes.INTEGER,
        references: {
            model: "products",
            key: "id"
        },
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "cart_item",
});

CartItem.sync();

export default CartItem;