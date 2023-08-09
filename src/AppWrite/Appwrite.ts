import { Client, Account, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64cee5cd58006d9430a9');

    export const account = new Account(client);

    // Database reference
    
    // export const databases = new Databases(client, "64c5b2ea5a7cf4c0b102");
    export const databases = new Databases(client);