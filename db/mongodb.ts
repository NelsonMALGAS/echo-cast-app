import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI;

// Name of the MongoDB database
const dbName = "echo-cast";

// Check if the required environment variable is present
if (!uri) {
  console.error("env values are not present.");
  process.exit(1);
}

/**
 * The MongoDB client instance,with some configuration options.
 */
const client = new MongoClient(uri, {
  maxIdleTimeMS: 500,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/**
 * Connects to the MongoDB database using the provided URI.
 *
 * @async
 * @function
 * @returns {Promise<MongoDB.Db>} A promise that resolves to the connected database instance.
 */
async function dbConnect() {
  try {
    await client.connect();
    console.log("Connected to database");
    return client.db(dbName);
  } catch (error) {
    console.error("Failed To Connect to database", error);
  }

}

export default dbConnect;
