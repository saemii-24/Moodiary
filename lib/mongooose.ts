import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
if (!URI) throw new Error("Missing MONGODB_URI");

console.log("ENV MONGODB_URI =", URI);

export async function connectDB() {
  const conn = await mongoose.connect(URI as string);
  console.log("Connected dbName =", mongoose.connection.db.databaseName);
  return conn;
}

export function connectionInfo() {
  return {
    readyState: mongoose.connection.readyState,
    dbName: mongoose.connection.db?.databaseName,
  };
}
