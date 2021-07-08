import express from 'express';
import { PORT } from './constants';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT);
