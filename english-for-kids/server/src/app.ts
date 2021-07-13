import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { PASSWORD, PORT, STATUS_CODES, USERNAME, ACCESS_TOKEN_SECRET, AUTH_ERROR_MESSAGE } from './constants/constants';
import { CATEGORIES_CARDS } from './constants/categories-cards';
import { WORDS_CARDS } from './constants/words-cards';
import { NAV_ITEMS } from './constants/nav-items';

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

const wordsImagesPath = path.join(__dirname, '../public/assets/images/categories-cards');
const wordsAudiosPath = path.join(__dirname, '../public/assets/audios/categories-cards');

function getMediaFileUrl(filePath: string) {
  const pathArr = filePath.split('/');
  const folder = pathArr[pathArr.length - 2];
  const file = pathArr[pathArr.length - 1];

  return { folder, file };
}

app.get(/\/api\/word-image/, (req, res) => {
  const { folder, file } = getMediaFileUrl(req.path);

  res.sendFile(`${ wordsImagesPath }/${ folder }/${ file }`);
});

app.get(/\/api\/word-audio/, (req, res) => {
  const { folder, file } = getMediaFileUrl(req.path);

  res.sendFile(`${ wordsAudiosPath }/${ folder }/${ file }`);
});

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
