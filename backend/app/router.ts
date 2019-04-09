import { Application } from 'egg';
import * as AV from 'leancloud-storage';
import { LEANCLOUD_DB_APP_ID, LEANCLOUD_DB_APP_KEY } from './app_config';

export default (app: Application) => {
  const { controller, router } = app;
  AV.init({
    appId: LEANCLOUD_DB_APP_ID,
    appKey: LEANCLOUD_DB_APP_KEY,
  });

  router.get('/', controller.home.index);
  router.get('/login', controller.home.goOAuthPage); // 跳转到 github oauth page
  router.get('/path', controller.home.authorizationCallbackUrl); // github callback url
  router.get('/user', controller.home.user); // 获取用户信息
  router.get('/stars', controller.home.fetchStarsList); // 获取 star 列表
  router.get('/pins', controller.home.fetchPinStarsList); // 获取 pin 列表
  router.post('/market_pin', controller.home.marketPin); // 集市 star 列表中的 pin 操作
  router.get('/pin', controller.home.pin);  // pin 列表中的 pin 操作
  router.get('/search_pin', controller.home.searchPinStar); // 搜索 pin
};
