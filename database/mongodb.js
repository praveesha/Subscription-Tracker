import mongoose from 'mongoose';
import {  DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    throw new Error(`Please define the DB_URI environment variable inside the .env.${NODE_ENV}.local`);
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        //Use backticks `` for string interpolation
        console.log(`Connected to the database in ${NODE_ENV} mode`);
    }
    catch(error) {
        //outputs the error
        console.log('Error connecting to the database: ', error);

        //indicates that the program terminated due to an error
        process.exit(1);
    }
}

export default connectToDatabase;