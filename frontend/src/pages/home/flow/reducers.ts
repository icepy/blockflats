import { IAction } from '../../../global/constants';
import {
  HOME_FETCH_STAR_LIST,
  IHomeStoreState,
  HOME_RELOAD,
  HOME_STARS_NO_DATA,
  HOME_CLEAN,
  HOME_PIN,
  HOME_MODAL
} from './constants';

const initState: IHomeStoreState = {
  stars: [],
  errorStatus: 0,
  reload: true,
  no_data: false,
  openModal: false,
}

export default function homeReducers(state = initState, action: IAction): IHomeStoreState {
  const { type, payload } = action;
  switch(type){
    case HOME_FETCH_STAR_LIST: {
      const oldStars = state.stars;
      const newStars = oldStars.concat(payload.data.map((v:any) => {
        v.login = v.owner.login;
        v.avatar_url = v.owner.avatar_url;
        v.license = v.license ? v.license.name : '';
        return v;
      }));
      return {...state, stars: newStars };
    }
    case HOME_RELOAD: {
      return {...state, reload: payload.data};
    }
    case HOME_STARS_NO_DATA: {
      return {...state, no_data: payload.data};
    }
    case HOME_CLEAN: {
      // 看情况要不要处理
      return {...state, stars: [], reload: true, no_data: false};
    }
    case HOME_PIN: {
      const oldStarsPin = state.stars;
      const { index, flats_pined } = payload.data;
      oldStarsPin[index].flats_pined = flats_pined;
      const newStarsPin = oldStarsPin
      return {...state, stars: newStarsPin };
    }
    case HOME_MODAL: {
      return {...state, openModal: payload.data};
    }
    default:
      return {...state};
  }
}
