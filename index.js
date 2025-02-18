import 'dotenv/config.js';
import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));
