import mongoose from "mongoose";
import URI from "./db-uri";

export default class Database{
    startup(){
        mongoose.connect(URI, (err) => {
            if(err){
                console.log(err);
            }
            console.log(`db connected`);
        })
    }
}