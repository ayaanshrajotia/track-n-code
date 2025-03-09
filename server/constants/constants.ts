import { ConnectionTypes } from "../types/constants";

export const ConnectionConfig: ConnectionTypes = {
    DB_NAME: process.env.DB_NAME,
    MONGO_URI: process.env.MONGODB_URI,
    CONNECTION_URI: `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
    CONN_ERR_MESSAGE: `❌ There is some error in MongoDB Connection`,
    CONN_SUCC_MESSAGE: `🛞 Connection to MongoDB Established`
}