import { IHomeStoreState } from "../pages/home/flow/constants";
import { IPinStoreState } from "../pages/pin/flow/constants";

export interface IAction {
  type: string;
  payload: {
    data: any;
  };
}

export interface IStoreState {
  home: IHomeStoreState;
  pin: IPinStoreState;
}
