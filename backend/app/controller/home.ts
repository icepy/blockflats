import { Controller, Context } from 'egg';
import * as querystring from 'querystring';
import { structureResponse } from '../shared/utils';
import { OK, ERROR, AXIOS_OK } from '../shared/constants';
import * as github from '../shared/thirdPartyGithub';

export default class HomeController extends Controller {

  public async index() {
    const { ctx } = this;
    await ctx.render('index.nj', {
      env: this.config.env,
    });
  }

  /**
   * 跳转到Github授权页
   */
  public async goOAuthPage() {
    this.ctx.redirect(github.createRedirectURL());
  }

  /**
   * 授权成功后的处理
   */
  public oauthOKHandler(ctx: Context, access_token: string, userId: string){
    ctx.cookies.set('access_token', access_token, {
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000,
      encrypt: true,
    });
    ctx.cookies.set('user_id', userId, {
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 1000,
      encrypt: true,
    });
    ctx.redirect('/');
  }

  /**
   * 授权页面 callback url
   */
  public async authorizationCallbackUrl() {
    const { ctx } = this;
    const { code } = ctx.query;
    try {
      const accessTokenResponse = await github.fetchAccessToken(code);
      const query = querystring.parse(accessTokenResponse.data);
      const access_token = query.access_token as string;
      const userResponse = await github.fetchUser(access_token);
      const userInfo = userResponse.data;
      userInfo.access_token = access_token;
      /// 检查授权用户是否已经在数据库中存在
      const verifiUser = await this.service.home.verificationUser(userInfo.id);
      if (verifiUser.code === OK) {
        /// 通过id更新用户表
        const updateUsered = await this.service.home.updateUser(userInfo.id, userInfo);
        if (updateUsered.code === OK) {
          this.oauthOKHandler(ctx, access_token, String(userInfo.id));
        } else {
          ctx.body = structureResponse('更新用户数据失败', ERROR);
        }
      } else {
        /// 创建一个新用户
        const saveUsered = await this.service.home.saveUser(userInfo);
        if (saveUsered.code === OK) {
          this.oauthOKHandler(ctx, access_token, String(userInfo.id));
        } else {
          ctx.body = structureResponse('保存用户数据失败', ERROR);
        }
      }
    } catch (e) {
      ctx.body = structureResponse('oauth授权获取access_token失败', ERROR);
    }
  }

  /**
   * 获取用户信息接口
   */
  public async user() {
    const { ctx } = this;
    const access_token = ctx.cookies.get('access_token', {
      encrypt: true,
    });
    if (!access_token) {
      ctx.body = structureResponse('', ERROR);
    } else {
      const userInfo = await this.service.home.fetchUserbyAccessToken(access_token);
      if (userInfo && userInfo.length > 0) {
        const originDate = userInfo[0].get('updatedAt');
        const nowDate = new Date();
        if (nowDate.getTime() > (originDate.getTime() + (12 * 60 * 60 * 1000))) {
          ctx.body = structureResponse(JSON.stringify(userInfo), ERROR, 'access_token timeout');
        } else {
          ctx.body = structureResponse(userInfo[0], OK);
        }
      } else {
        ctx.body = structureResponse(JSON.stringify(userInfo), ERROR);
      }
    }
  }

  /**
   * stars 列表接口
   */
  public async fetchStarsList() {
    const { ctx } = this;
    const access_token = ctx.cookies.get('access_token', {
      encrypt: true,
    });
    const { page } = ctx.query;
    try {
      const response = await github.fetchStars(access_token, page);
      if (response && response.status === AXIOS_OK){
        const { data } = response;
        ctx.body = structureResponse(data, OK);
      } else {
        ctx.body = structureResponse(response.data, ERROR);
      }
    } catch (e) {
      ctx.body = structureResponse(e, ERROR);
    }
  }

  /**
   * pin 列表接口
   */
  public async fetchPinStarsList() {
    const { ctx } = this;
    const access_token = ctx.cookies.get('access_token', {
      encrypt: true,
    });
    if (!access_token) {
      ctx.body = structureResponse('', ERROR);
    } else {
      const user_id = ctx.cookies.get('user_id', {
        encrypt: true,
      });
      const { page } = ctx.query;
      if (!user_id || !page) {
        ctx.body = structureResponse('', ERROR);
      } else {
        const findPined = await this.service.home.fetchPinStars(Number(user_id), Number(page));
        if (findPined && findPined.length > 0) {
          ctx.body = structureResponse(findPined, OK);
        } else {
          ctx.body = structureResponse('', ERROR);
        }
      }
    }
  }

  /**
   * pin列表操作 pin star 的逻辑
   */
  public async pin() {
    const { ctx } = this;
    const access_token = ctx.cookies.get('access_token', {
      encrypt: true,
    });
    if (!access_token) {
      ctx.body = structureResponse('', ERROR);
    } else {
      const user_id = ctx.cookies.get('user_id', {
        encrypt: true,
      });
      const { id } = ctx.query;
      try {
        /// 查询是这个用户id下的项目id
        const findPined = await this.service.home.fetchPinStar(Number(id), Number(user_id));
        if (findPined && findPined.length > 0) {
          const pinStar = findPined[0];
          const objectId = pinStar.get('objectId');
          // 删除
          const removePined = await this.service.home.removePinStar(objectId);
          ctx.body = structureResponse('', removePined ? OK : ERROR);
        } else {
          ctx.body = structureResponse('', ERROR);
        }
      } catch (e) {
        ctx.body = structureResponse(JSON.stringify(e), ERROR);
      }
    }
  }

  /**
   * 集市列表操作 pin star 的逻辑
   */
  public async marketPin() {
    const { ctx } = this;
    const access_token = ctx.cookies.get('access_token', {
      encrypt: true,
    });
    if (!access_token) {
      ctx.body = structureResponse('', ERROR);
    } else {
      const user_id = ctx.cookies.get('user_id', {
        encrypt: true,
      });
      const body = ctx.request.body;
      try {
        const findPined = await this.service.home.fetchPinStar(Number(body.id), Number(user_id));
        if (findPined && findPined.length > 0) {
          ctx.body = structureResponse('', ERROR);
        } else {
          const savePined = await this.service.home.savePinStar(Number(user_id), body);
          if (savePined.code === OK) {
            ctx.body = structureResponse('', OK);
          } else {
            ctx.body = structureResponse(savePined.msg, ERROR);
          }
        }
      } catch (e) {
        ctx.body = structureResponse('', ERROR);
      }
    }
  }

  /**
   * 搜索 pin star 接口
   */
  public async searchPinStar() {
    const { ctx } = this;
    const { searchKey } = ctx.query;
    const result = await this.service.home.searchPinStar(decodeURIComponent(searchKey));
    if (result && result.length > 0) {
      ctx.body = structureResponse(result, OK);
    } else {
      ctx.body = structureResponse('', ERROR);
    }
  }
}
