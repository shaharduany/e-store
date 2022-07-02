import { Session,  SessionData } from "express-session";

declare module "express-session" {
    interface SessionData {
        isLogged: boolean;
    }

    interface Session {
        isLogged: boolean;
    }
}