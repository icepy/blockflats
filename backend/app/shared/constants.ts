export const OK = 0;
export const UNUSUAL = -1;
export const ERROR = 1;
export const UNUSUAL_MESSAGE = `(UNUSUAL)\'${UNUSUAL}`;
export const AXIOS_OK = 200;

export interface IResponse<T> {
  statusCode: number;
  errorMessage: string;
  data: T;
}

export interface IInternal<T> {
  code: number;
  msg: string;
  data: T;
}

export const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
export const GITHUB_ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
export const GITHUB_USER_URL = 'https://api.github.com/user';
export const GITHUB_STARS_URL = 'https://api.github.com/user/starred';
