import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

// check that  connectionString already fine
if (!connectionString) {
  throw new Error("MONGODB_CONNECTION_STRING is not defined");
}

// type data for  MongoClient
let client: MongoClient;


export const getMongoClientInstance = async () => {
  if (!client) {
    client = await MongoClient.connect(connectionString);
    await client.connect();
  }

  return client;
};
