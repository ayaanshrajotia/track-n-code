import { Connection } from "mongoose";

export interface CachedConnection {
    conn: Connection | null;
    promise: Promise<Connection> | null;
}

export interface PlatformUrlConfig {
    [key: string]: (username: string) => string;
}