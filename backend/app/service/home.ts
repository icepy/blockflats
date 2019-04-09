import { Service } from 'egg';
import * as AV from 'leancloud-storage';
import { internalServiceResponse } from '../shared/utils';
import { OK, ERROR, IInternal } from '../shared/constants';

const GUITableKey = 'UserTable';
const USPinTableKey = 'UserPinStarTable';

const GithubUserInfo = AV.Object.extend(GUITableKey);
const GithubUserPinStarInfo = AV.Object.extend(USPinTableKey);

interface IParams {
  [key: string]: any;
}

/**
 * Home Service
 */
export default class Home extends Service {

  /// 验证用户
  public async verificationUser(id: number): Promise<IInternal<string>> {
    const query = new AV.Query(GUITableKey);
    query.equalTo('id', id);
    try {
      const d = await query.find();
      return internalServiceResponse((d && d.length > 0) ? OK : ERROR, '');
    } catch (e) {
      return internalServiceResponse(ERROR, JSON.stringify(e));
    }
  }

  // 通过 access_token 查询用户
  public async fetchUserbyAccessToken(access_token: string) {
    const query = new AV.Query(GUITableKey);
    query.equalTo('access_token', access_token);
    try {
      return await query.find();
    } catch (e) {
      return false;
    }
  }

  /// 保存用户
  public async saveUser(userInfo: any) {
    const githubUserInfo = new GithubUserInfo();
    Object.keys(userInfo).forEach((v: any) => {
      githubUserInfo.set(v, userInfo[v]);
    });
    const saveUsered = await new Promise((resolve, reject) => {
      githubUserInfo.save().then(() => {
        resolve(true);
      }, () => {
        reject(false);
      });
    });
    return internalServiceResponse(saveUsered ? OK : ERROR, '');
  }

  public async updateUser(id: number, params: IParams) {
    const query = new AV.Query(GUITableKey);
    query.equalTo('id', id);
    try {
      const userInfos = await query.find();
      if (userInfos && userInfos.length === 1) {
        const userInfo = userInfos[0];
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            const element = params[key];
            userInfo.set(key, element);
          }
        }
        userInfo.save();
        return internalServiceResponse(OK, '');
      } else {
        return internalServiceResponse(ERROR, '');
      }
    } catch (e) {
      return internalServiceResponse(ERROR, JSON.stringify(e));
    }
  }

  /// 查询单个已经被 pin 过的 star

  public async fetchPinStar(id: number, userId: number) {
    const query = new AV.Query(USPinTableKey);
    query.equalTo('id', id);
    query.equalTo('flats_user_id', userId);
    try {
      return await query.find();
    } catch (e) {
      return false;
    }
  }

  /// 删除 pin star
  public async removePinStar(objectId: string) {
    const pinStar = AV.Object.createWithoutData(USPinTableKey, objectId);
    try {
      return await new Promise((resolve, reject) => {
        pinStar.destroy().then(() => {
          resolve(true);
        }, () => {
          reject(false);
        });
      });
    } catch (e) {
      return false;
    }
  }

  /// 批量获取 user_id 下 flats_pined 为 true 的列表
  public async fetchPinStars(userId: number, page: number, limit = 10) {
    const query = new AV.Query(USPinTableKey);
    query.equalTo('flats_user_id', userId);
    query.equalTo('flats_pined', true);
    query.limit(limit);
    query.skip(page === 1 ? 0 : (page - 1) * limit);
    try {
      return await query.find();
    } catch (e) {
      return false;
    }
  }

  /// 搜索已经 pin 过的 star
  public async searchPinStar(searchKey: string) {
    const query = new AV.Query(USPinTableKey);
    query.contains('description', searchKey);
    try {
      return await query.find();
    } catch (e) {
      return false;
    }
  }

  /// 集市页面保存 star 项目

  public async savePinStar(userId: number, star: any) {
    try {
      const pinStar = new GithubUserPinStarInfo();
      pinStar.set('id', star.id);
      pinStar.set('html_url', star.html_url);
      pinStar.set('flats_user_id', userId);
      pinStar.set('flats_pined', star.flats_pined);
      pinStar.set('full_name', star.full_name);
      pinStar.set('login', star.owner.login);
      pinStar.set('avatar_url', star.owner.avatar_url);
      pinStar.set('description', star.description);
      pinStar.set('language', star.language);
      pinStar.set('forks', star.forks);
      pinStar.set('forks_count', star.forks_count);
      pinStar.set('watchers', star.watchers);
      pinStar.set('watchers_count', star.watchers_count);
      pinStar.set('default_branch', star.default_branch);
      pinStar.set('license', star.license ? star.license.name : '');
      const savePined = await new Promise((resolve, reject) => {
        pinStar.save().then(() => {
          resolve(true);
        }, () => {
          reject(false);
        });
      });
      return internalServiceResponse(savePined ? OK : ERROR, '');
    } catch (e) {
      return internalServiceResponse(OK, JSON.stringify(e));
    }
  }
}
