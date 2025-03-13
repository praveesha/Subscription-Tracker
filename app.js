import express from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res)=>{
    res.send("Welcome to the Subcription Tracker API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;