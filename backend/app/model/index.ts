export interface IStars {
  id: number;
  full_name: string;
  flatsUserId: number;
  flatsType: number;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  language: string;
  forks: number;
  forks_count: number;
  watchers: number;
  watchers_count: number;
  default_branch: number;
  license: {
    name: string;
  };
}
