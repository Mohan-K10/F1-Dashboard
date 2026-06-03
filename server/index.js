import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/route.js';

const currentDir = fileURLToPath(new URL('.', import.meta.url));

configDotenv({ path: resolve(currentDir, '.env') });

const app = express();

const port = process.env.PORT || 5001
app.use(cors())
app.use('/',routes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

