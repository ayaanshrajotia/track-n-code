import { Connection } from "mongoose";

export interface CachedConnection {
    conn: Connection | null;
    promise: Promise<Connection> | null;
}