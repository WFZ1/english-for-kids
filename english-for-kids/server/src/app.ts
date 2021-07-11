import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { PASSWORD, PORT, STATUS_CODES, USERNAME, ACCESS_TOKEN_SECRET, AUTH_ERROR_MESSAGE, CATEGORIES_CARDS, NAV_ITEMS, WORDS_CARDS } from './constants';

const app = express();

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
      if (err) return res.sendStatus(STATUS_CODES.forbidden);

      return next();
    });
  }
  else {
    res.sendStatus(STATUS_CODES.unauthorized);
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const accessToken = jwt.sign({ username: USERNAME }, ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  }
  else {
    res.json({ error: AUTH_ERROR_MESSAGE });
  }
});

app.get('/api/categories', (req, res) => res.json(CATEGORIES_CARDS));

app.get('/api/nav-items', (req, res) => res.json(NAV_ITEMS));

app.get('/api/words', (req, res) => res.json(WORDS_CARDS));

app.listen(PORT);
