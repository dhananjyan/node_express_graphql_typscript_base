import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017/airbnb",
}
export const GRAPHQL_PATH = process.env.GRAPHQL_PATH || "/graphql";
export const jwtConfig = {
    secret: process.env.JWT_SECRET || "AKSFU0)(*&OILHAFAAKP\}F[PQEJ440]]AOIDIDSJ",
    headerKey: process.env.JWT_HEADER_KEY || "authorization"
}

