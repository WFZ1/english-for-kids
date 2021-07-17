export const PORT = process.env.PORT || 7000;

const PRODUCTION_MODE_URL = 'https://wfz1-english-for-kids.herokuapp.com';
const DEVELOPMENT_MODE_URL = `http://localhost:${ PORT }`;

const URL = (process.env.NODE_ENV ? PRODUCTION_MODE_URL : DEVELOPMENT_MODE_URL);

export const USERNAME = 'admin';
export const PASSWORD = 'admin';

export const STATUS_CODES = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
};

export const ACCESS_TOKEN_SECRET = 'iinmomentandflewadaythatidonotnoticed';

export const AUTH_ERROR_MESSAGE = 'Username or password incorrect';

export const WORDS_IMAGES_PATH = `${ URL }/api/word-image`;
export const WORDS_AUDIOS_PATH = `${ URL }/api/word-audio`;
