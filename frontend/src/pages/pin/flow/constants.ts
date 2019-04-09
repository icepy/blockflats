import { IStarInfo } from '../../../services/constants';

export const PIN_FETCH_STAR_LIST = 'PIN_FETCH_STAR_LIST'; /// 获取pin列表
export const PIN_RELOAD = 'PIN_RELOAD'; /// 获取列表时转圈的状态
export const PIN_CLEAN = 'PIN_CLEAN'; // 销毁时清除
export const PIN_MODAL = 'PIN_MODAL'; // 提示效果
export const PIN_NO_DATA = 'PIN_NO_DATA'; // 没有数据时的状态
export const PIN_UPDATE_PINED = 'PIN_UPDATE_PINED'; // 更新pined的状态
export const PIN_REMOVE = 'PIN_REMOVE'; // 删除已经移除pined状态的item
export const PIN_ONE_NO_DATA = 'PIN_ONE_NO_DATA'; // 第一次加载无数据时
export const PIN_SEARCH_RESULT = 'PIN_SEARCH_RESULT'; //搜索结果展示

export interface IPinStoreState {
  pinStars: IStarInfo[];
  reload: boolean;
  noData: boolean;
  openModal: boolean;
  openText: string;
  onUpsearch: boolean;
  whichStatus: number;
}
