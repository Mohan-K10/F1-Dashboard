import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import routes from './routes/route.js';


configDotenv();

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

