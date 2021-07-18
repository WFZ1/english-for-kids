import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import fse from 'fs-extra';
import {
  PASSWORD,
  PORT,
  STATUS_CODES,
  USERNAME,
  ACCESS_TOKEN_SECRET,
  AUTH_ERROR_MESSAGE,
} from './constants/constants';
import { CATEGORIES_CARDS } from './constants/categories-cards';
import { WORDS_CARDS } from './constants/words-cards';
import { NAV_ITEMS } from './constants/nav-items';
import ICategoryUpdatingProps from './types/category-updating-props.type';

const app = express();

const publicFolderPath = path.join(__dirname, '../public');
const backupAssetsFolderPath = path.join(__dirname, '../public/backup');
const wwwFolderPath = path.join(__dirname, '../www');

// updateCategory function renames categories folders. For stable work app need restore default folders names when server reload
(async () => {
  await fse.remove(`${publicFolderPath}/assets`);
  fse.copy(backupAssetsFolderPath, publicFolderPath);
})();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const wordsImagesPath = path.join(
  __dirname,
  '../public/assets/images/categories-cards',
);
const wordsAudiosPath = path.join(
  __dirname,
  '../public/assets/audios/categories-cards',
);

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
      if (err) return res.sendStatus(STATUS_CODES.forbidden);

      return next();
    });
  } else {
    res.sendStatus(STATUS_CODES.unauthorized);
  }
};

function getMediaFileUrl(filePath: string) {
  const pathArr = filePath.split('/');
  const folder = pathArr[pathArr.length - 2];
  const file = pathArr[pathArr.length - 1];

  return { folder, file };
}

function deleteCategory(name: string): void {
  const index = CATEGORIES_CARDS.findIndex((cat) => cat.handle === name);

  if (index < 0) throw Error('Category not found');

  CATEGORIES_CARDS.splice(index, 1);
  WORDS_CARDS.splice(index, 1);
  NAV_ITEMS.splice(index + 1, 1);
}

function updateCategory(
  { handle, title }: ICategoryUpdatingProps,
  catName: string,
): void {
  const index = CATEGORIES_CARDS.findIndex((cat) => cat.handle === catName);
  if (index < 0) throw Error('Category not found');

  const isCategoryNameUsed = CATEGORIES_CARDS.findIndex(
    (cat) => cat.handle === handle,
  );
  if (isCategoryNameUsed >= 0) throw Error('Category name used');

  const cat = CATEGORIES_CARDS[index];
  const oldHandle = cat.handle;

  cat.title = title;
  cat.handle = handle;
  cat.image = cat.image.replace(oldHandle, handle);

  WORDS_CARDS[index].forEach((word) => {
    word.image = word.image.replace(oldHandle, handle);
    word.audio = word.audio.replace(oldHandle, handle);
  });

  NAV_ITEMS[index + 1] = {
    text: title,
    url: NAV_ITEMS[index + 1].url.replace(oldHandle, handle),
  };

  fs.renameSync(
    `${wordsImagesPath}/${oldHandle}`,
    `${wordsImagesPath}/${handle}`,
  );
  fs.renameSync(
    `${wordsAudiosPath}/${oldHandle}`,
    `${wordsAudiosPath}/${handle}`,
  );
}

app.get(/^(?!\/api\/)/, express.static(wwwFolderPath));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === USERNAME && password === PASSWORD) {
    const accessToken = jwt.sign({ username: USERNAME }, ACCESS_TOKEN_SECRET);
    res.json({ accessToken });
  } else {
    res.json({ error: AUTH_ERROR_MESSAGE });
  }
});

app.get(/\/api\/word-image/, (req, res) => {
  const { folder, file } = getMediaFileUrl(req.path);

  res.sendFile(`${wordsImagesPath}/${folder}/${file}`);
});

app.get(/\/api\/word-audio/, (req, res) => {
  const { folder, file } = getMediaFileUrl(req.path);

  res.sendFile(`${wordsAudiosPath}/${folder}/${file}`);
});

app.get('/api/nav-items', (req, res) => res.json(NAV_ITEMS));

app.get('/api/categories', (req, res) => res.json(CATEGORIES_CARDS));

app.delete('/api/category/:name', (req, res) => {
  const categoryName = req.params.name;

  try {
    deleteCategory(categoryName);
    res.sendStatus(STATUS_CODES.ok);
  } catch (e) {
    res.status(STATUS_CODES.badRequest).send(e);
  }
});

app.patch('/api/category/:name', (req, res) => {
  const categoryName = req.params.name;

  try {
    updateCategory(req.body, categoryName);
    res.sendStatus(STATUS_CODES.ok);
  } catch (e) {
    res.status(STATUS_CODES.badRequest).send(e);
  }
});

app.get('/api/words', (req, res) => res.json(WORDS_CARDS));

app.listen(PORT);
