import { Dispatch } from 'redux';
import { HOME_FETCH_STAR_LIST, HOME_RELOAD, HOME_STARS_NO_DATA, HOME_CLEAN, HOME_PIN, HOME_MODAL } from './constants';
import { fetchStarList, commitMarketPin } from '../../../services';
import { IServiceResponse} from '../../../services/constants';
import { AxiosResponse } from 'axios';
import { OK, ERROR } from '../../../shared/constants';

export const fetchStars = (page: number) => (dispatch: Dispatch) => {
  dispatch({
    type: HOME_RELOAD,
    payload: {
      data: true
    }
  });
  fetchStarList(page).then((response: AxiosResponse<IServiceResponse<any>>) => {
    const axiosData = response.data;
    if (axiosData.statusCode === OK) {
      const { data } = axiosData;
      if (data.length === 0) {
        dispatch({
          type: HOME_STARS_NO_DATA,
          payload: {
            data: true
          }
        })
        return;
      }
      dispatch({
        type: HOME_FETCH_STAR_LIST,
        payload: {
          data
        }
      });
      dispatch({
        type: HOME_RELOAD,
        payload: {
          data: false
        }
      });
    } else {

    }
  }).catch((error) => {

  });
}

export const pin = (index: number, flats_pined: boolean, star: any) => (dispatch: Dispatch) => {
  dispatch({
    type: HOME_PIN,
    payload: {
      data: {
        index,
        flats_pined
      }
    }
  });
  commitMarketPin(star).then((response: AxiosResponse<IServiceResponse<any>>) => {
    const axiosData = response.data;
    if (axiosData.statusCode === ERROR) {
      dispatch({
        type: HOME_PIN,
        payload: {
          data: {
            index,
            flats_pined: false
          }
        }
      });
      dispatch({
        type: HOME_MODAL,
        payload: {
          data: true
        }
      });
      setTimeout(() => {
        dispatch({
          type: HOME_MODAL,
          payload: {
            data: false
          }
        });
      }, 1200);
    }
  }).catch(() => {

  });
}

export const clean = () => (dispatch: Dispatch) => {
  dispatch({
    type: HOME_CLEAN
  });
}
