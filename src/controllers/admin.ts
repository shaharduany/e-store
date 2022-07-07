import { RequestHandler } from "express";
import Role from "../models/role";
import Session from "../models/session";
import User from "../models/user";

// export const isAdmin:RequestHandler = async(req, res, next) => {
//     let sessionId = req.sessionID;
//     try {
//         const session = await Session.findByPk(sessionId);
//         if(!session){
//             throw new Error("Unauthorized request");
//         }

//         const user = await User.findByPk(session.getDataValue("user"));
//     }catch ()
// }