import mongoose from "mongoose";

const envUri = process.env.MONGODB_URI;
if (!envUri) {
  throw new Error("Missing MONGODB_URI (check .env.local)");
}
const MONGODB_URI: string = envUri;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalAny = global as unknown as { _mongooseCache?: MongooseCache };

if (!globalAny._mongooseCache) {
  globalAny._mongooseCache = { conn: null, promise: null };
}

export async function connectDB(): Promise<typeof mongoose> {
  const cache = globalAny._mongooseCache!;
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  try {
    cache.conn = await cache.promise;
  } catch (e) {
    cache.promise = null;
    throw e;
  }
  return cache.conn;
}
