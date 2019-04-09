import { PIN_FETCH_STAR_LIST, PIN_RELOAD, PIN_CLEAN, PIN_MODAL, PIN_NO_DATA, PIN_UPDATE_PINED, PIN_REMOVE, PIN_ONE_NO_DATA, PIN_SEARCH_RESULT } from './constants';
import { Dispatch } from 'redux';
import { fetchPinStarList, commitPin, searchPinStar } from '../../../services/index';
import { AxiosResponse } from 'axios';
import { IServiceResponse, IStarInfo } from '../../../services/constants';
import { OK } from '../../../shared/constants';

export const fetchPins = (page: number) => (dispatch: Dispatch) => {
  dispatch({
    type: PIN_RELOAD,
    payload: {
      data: true,
    }
  });
  fetchPinStarList(page).then((response: AxiosResponse<IServiceResponse<any>>) => {
    const axiosData = response.data;
    if (axiosData.statusCode === OK) {
      const { data } = axiosData;
      if (data.length === 0) {
        dispatch({
          type: PIN_NO_DATA,
          payload: {
            data: true
          }
        });
        if (page === 1) {
          dispatch({
            type: PIN_ONE_NO_DATA,
            payload: {
              data: 2
            }
          });
        }
        return;
      }
      dispatch({
        type: PIN_FETCH_STAR_LIST,
        payload: {
          data
        }
      });
      dispatch({
        type: PIN_RELOAD,
        payload: {
          data: false
        }
      });
    } else {
      dispatch({
        type: PIN_RELOAD,
        payload: {
          data: false
        }
      });
      dispatch({
        type: PIN_MODAL,
        payload: {
          data: {
            openModal: true,
            openText: '提醒：没有更多 Pin 的数据'
          }
        }
      });
      dispatch({
        type: PIN_NO_DATA,
        payload: {
          data: true,
        }
      });
      setTimeout(() => {
        dispatch({
          type: PIN_MODAL,
          payload: {
            data: {
              openModal: false,
              openText: ''
            }
          }
        });
      }, 1200);
    }
  }).catch((error) => {

  });
}

export const clean = () => (dispatch: Dispatch) => {
  dispatch({
    type: PIN_CLEAN
  });
}

export const pinAction = (index: number, star: IStarInfo) => (dispatch: Dispatch) => {
  const flats_pined = star.flats_pined;
  dispatch({
    type: PIN_UPDATE_PINED,
    payload: {
      data: {
        index,
        flats_pined: !flats_pined
      }
    }
  });
  commitPin(star.id).then((response: AxiosResponse<IServiceResponse<any>>) => {
    const axiosData = response.data;
    if (axiosData.statusCode === OK) {
      dispatch({
        type: PIN_REMOVE,
        payload: {
          data: index,
        }
      });
    } else {
      dispatch({
        type: PIN_MODAL,
        payload: {
          data: {
            openModal: true,
            openText: '提醒：未知错误或网络错误'
          }
        }
      });
      setTimeout(() => {
        dispatch({
          type: PIN_MODAL,
          payload: {
            data: {
              openModal: false,
              openText: ''
            }
          }
        });
      }, 1200);
    }
  }).catch(() => {
    dispatch({
      type: PIN_UPDATE_PINED,
      payload: {
        data: {
          index,
          flats_pined: flats_pined
        }
      }
    });
    dispatch({
      type: PIN_MODAL,
      payload: {
        data: {
          openModal: true,
          openText: '错误：网络问题'
        }
      }
    });
    setTimeout(() => {
      dispatch({
        type: PIN_MODAL,
        payload: {
          data: {
            openModal: false,
            openText: ''
          }
        }
      });
    }, 1200);
  });
}

export const searchPin = (searchKey: string) => (dispatch: Dispatch) => {
  searchPinStar(searchKey).then((response: AxiosResponse<IServiceResponse<any>>) => {
    const axiosData = response.data;
    if (axiosData.statusCode === OK) {
      dispatch({
        type: PIN_SEARCH_RESULT,
        payload: {
          data: axiosData.data
        }
      });
    } else {
      dispatch({
        type: PIN_MODAL,
        payload: {
          data: {
            openModal: true,
            openText: '提醒：未搜索到结果'
          }
        }
      });
      setTimeout(() => {
        dispatch({
          type: PIN_MODAL,
          payload: {
            data: {
              openModal: false,
              openText: ''
            }
          }
        });
      }, 1200);
    }
  }).catch(() => {
    dispatch({
      type: PIN_MODAL,
      payload: {
        data: {
          openModal: true,
          openText: '错误：网络问题'
        }
      }
    });
    setTimeout(() => {
      dispatch({
        type: PIN_MODAL,
        payload: {
          data: {
            openModal: false,
            openText: ''
          }
        }
      });
    }, 1200);
  });
}
