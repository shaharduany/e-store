import {  SessionData as OldSessData } from "express-session";
import { UserI } from '../models/user';

declare global {
    namespace Express {
        interface SessionData extends OldSessData {
            isLogged: boolean;
        }

        interface User extends UserI {}
    }
}