import { IAction } from '../../../global/constants';
import {
  IPinStoreState,
  PIN_RELOAD,
  PIN_FETCH_STAR_LIST,
  PIN_CLEAN,
  PIN_MODAL,
  PIN_NO_DATA,
  PIN_UPDATE_PINED,
  PIN_REMOVE,
  PIN_ONE_NO_DATA,
  PIN_SEARCH_RESULT
} from './constants';

/// whichStatus 0 load 状态 1 有数据的状态 2 第一次noData

const initState: IPinStoreState = {
  pinStars: [],
  reload: true,
  noData: false,
  openModal: false,
  openText: '',
  onUpsearch: false,
  whichStatus: 0,
}

export default function pinReducers(state = initState, action: IAction): IPinStoreState {
  const { type, payload } = action;
  switch(type) {
    case PIN_FETCH_STAR_LIST: {
      const oldPinStars = state.pinStars;
      const newPinStars = oldPinStars.concat(payload.data);
      return {...state, pinStars: newPinStars, onUpsearch: false, whichStatus: 1};
    }
    case PIN_RELOAD: {
      return {...state, reload: payload.data};
    }
    case PIN_CLEAN: {
      return {...state, ...initState};
    }
    case PIN_MODAL: {
      return {...state, openModal: payload.data.openModal, openText: payload.data.openText};
    }
    case PIN_NO_DATA: {
      return {...state, noData: payload.data};
    }
    case PIN_UPDATE_PINED: {
      const oldStarsPin = state.pinStars;
      const { index, flats_pined } = payload.data;
      oldStarsPin[index].flats_pined = flats_pined;
      const newStarsPin = oldStarsPin;
      return {...state, pinStars: newStarsPin};
    }
    case PIN_REMOVE: {
      const oldStarsPin = state.pinStars;
      oldStarsPin.splice(payload.data, 1);
      if (oldStarsPin.length === 0) {
        return {...state, whichStatus: 2};
      }
      return {...state, pinStars: oldStarsPin};
    }
    case PIN_ONE_NO_DATA: {
      return {...state, whichStatus: payload.data};
    }
    case PIN_SEARCH_RESULT: {
      return {...state, pinStars: payload.data, onUpsearch: true };
    }
    default:
    return {...state};
  }
}
