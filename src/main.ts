import express, { Request, Response } from 'express';
import logger from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import { router } from './router'
import { connectDB } from './utils';

dotenv.config()

const app = express();
app.use(logger('dev'))
app.use(cors())

connectDB()

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
