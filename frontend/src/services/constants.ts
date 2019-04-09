export interface IServiceResponse<T> {
  statusCode: number;
  errorMessage: string;
  data: T;
}

export interface IUserInfo {
  avatar_url: string;
  access_token: string;
  login: string;
  html_url: string;
}

export interface IStarInfo {
  id: number;
  full_name: string;
  flats_user_id: number;
  flats_type: number;
  html_url: string;
  login: string;
  avatar_url: string;
  description: string;
  language: string;
  forks: number;
  forks_count: number;
  watchers: number;
  watchers_count: number;
  default_branch: number;
  license: string;
  flats_pined: boolean;
}

