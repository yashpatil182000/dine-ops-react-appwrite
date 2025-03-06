import { Client, Account, Databases, Storage } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(`${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { databases, storage, account };
