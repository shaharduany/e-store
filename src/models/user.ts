import { Pool } from "pg";
import pool from "./pgWrapper";


enum Role {
	costumer = "costumer",
	seller = "seller",
	owner = "owner",
}

class User {
	private email: string;
	private username: string;
	private accessToken: string;
	private password: string;
	private role: Role;
    private pool: Pool;

	constructor(
		email: string,
		username: string,
		accessToken: string,
		role: Role = Role.costumer,
		passowrd: string = "none"
	) {
		this.email = email;
		this.username = username;
		this.accessToken = accessToken;
		this.role = role;
		this.password = passowrd;
        this.pool = pool;
    }
    
}

export default User;
