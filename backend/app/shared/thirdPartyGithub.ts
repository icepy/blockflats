import Axios from 'axios';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../app_config';
import { GITHUB_ACCESS_TOKEN_URL, GITHUB_USER_URL, GITHUB_OAUTH_URL, GITHUB_STARS_URL } from './constants';

export const fetchAccessToken = (code: string) => {
  const postParams = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code,
  };
  return Axios.post(GITHUB_ACCESS_TOKEN_URL, postParams);
};

export const fetchUser = (access_token: string) => {
  return Axios.get(`${GITHUB_USER_URL}?access_token=${access_token}`);
};

export const createRedirectURL = () => {
  return `${GITHUB_OAUTH_URL}?client_id=${GITHUB_CLIENT_ID}&state=${new Date().valueOf()}`;
};

export const fetchStars = (access_token: string, page: string) => {
  return Axios.get(`${GITHUB_STARS_URL}?access_token=${access_token}&page=${page}`);
};
