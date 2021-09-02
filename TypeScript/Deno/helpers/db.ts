import { MongoClient, Database } from "https://deno.land/x/mongo/mod.ts";
import { MONGO_URI } from "../config/keys.ts";

let database: Database;

export async function connect() {
  const client = new MongoClient();

  await client.connect(MONGO_URI);

  const database = client.database("learning_resources");
}

function getDb() {
  return database;
}

export default getDb;
