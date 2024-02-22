import mongoose from "mongoose";

const MONGODM_URI = process.env.MONGODM_URI;

let cached = (global as any).mongoose || {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODM_URI) throw new Error("MONGODM_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODM_URI, {
      dbName: "EventlyApp",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
