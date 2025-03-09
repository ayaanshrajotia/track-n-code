import mongoose, { Connection } from "mongoose";
import { ConnectionConfig } from "../constants/constants";
import { CachedConnection } from "../types/db/interfaces";

if (!ConnectionConfig.CONNECTION_URI) {
  throw new Error("Please define the ConnectionConfig.CONNECTION_URI environment variable.");
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseGlobal: CachedConnection;
}

const globalCache: CachedConnection = global.mongooseGlobal || { conn: null, promise: null };
if (!global.mongooseGlobal) {
  global.mongooseGlobal = globalCache;
}

class MongoConnection {
  private static instance: MongoConnection;
  private connection: Connection | null = null;

  private constructor() {}

  public static async connect(): Promise<Connection> {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }

    if (globalCache.conn) {
      console.log("✅ Using existing MongoDB connection");
      return globalCache.conn;
    }

    if (!globalCache.promise) {
      console.log("🔄 Establishing new MongoDB connection...");
      globalCache.promise = mongoose
        .connect(ConnectionConfig.CONNECTION_URI as string)
        .then((mongooseInstance) => {
          globalCache.conn = mongooseInstance.connection;
          console.log("✅ MongoDB")
          return mongooseInstance.connection;
        });
    }

    MongoConnection.instance.connection = await globalCache.promise;
    return MongoConnection.instance.connection;
  }
}

export default MongoConnection;