import { Client, Account, Databases, Query } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652e8a9c72b17d1a94b0'); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const query = new Query();
export { ID } from 'appwrite';
