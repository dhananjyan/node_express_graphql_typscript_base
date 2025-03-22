import mongoose from "mongoose";
import { dbConfig } from "../config";

const connectDb = () => {
    return new Promise<any>((resolve, reject) => {
        mongoose.connect(dbConfig.uri).then(resolve).catch((error) => {
            console.error(error)
            reject(error);
        })
        mongoose.set('debug', true);

    })
}

export default connectDb