//loads the environment variables from the .env.development.local file into process.env
//Still this does not automatically retrieve them for use in your code.
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

//retrieving environment variables from process.env and assign default values if they are missing. It does not define environment variables; it just reads them from the system or .env file.
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_URI = process.env.DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const ARCJET_KEY = process.env.ARCJET_KEY;
const ARCJET_ENV = process.env.ARCJET_ENV;
const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
const QSTASH_URL = process.env.QSTASH_URL;
const SERVER_URL = process.env.SERVER_URL;


export { 
    PORT, 
    NODE_ENV, 
    DB_URI,
    JWT_SECRET, JWT_EXPIRES_IN,
    ARCJET_KEY, ARCJET_ENV,
    QSTASH_URL, QSTASH_TOKEN,
    SERVER_URL,
};