import { IStarInfo } from '../../../services/constants';

export const HOME_FETCH_STAR_LIST = 'HOME_FETCH_STAR_LIST';
export const HOME_RELOAD = 'HOME_RELOAD';
export const HOME_STARS_NO_DATA = 'HOME_STARS_NO_DATA';
export const HOME_CLEAN = 'HOME_CLEAN';
export const HOME_PIN = 'HOME_PIN';
export const HOME_MODAL = 'HOME_MODAL';


export interface IHomeStoreState{
  stars: IStarInfo[];
  errorStatus: number;
  reload: boolean;
  no_data: boolean;
  openModal: boolean;
}
