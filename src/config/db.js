import mongoose from "mongoose";

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI =
  "mongodb+srv://shadmerhi:Cowmanozmo4%23%23@cluster0.vqivb.mongodb.net/wheelOfFortuneDev?authSource=admin&replicaSet=atlas-33pbyo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("ATTEMPTING DATABASE CONNECTION", process.env.MONGO_URI);
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      console.log("MONGODB SUCCESSFULLY CONNECTED");
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
