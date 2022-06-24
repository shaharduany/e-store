import { Sequelize } from "sequelize";

const sequelize = new Sequelize("estore", "shahar", "test", {
	dialect: "postgres",
	host: "localhost"
});

export default sequelize;
