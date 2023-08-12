import sha1 from 'sha1';
import NodeCache from 'node-cache';
import fetch from 'node-fetch';

// https://student-api.beta.saybot.net/api/v2/weixin/config?url=baidu.com
// https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4

declare var wx: any;

interface WechatSignatureConfig {
  appId: string;
  appSecret: string;
}

const { WECHAT_APP_ID, WECHAT_APP_SECRET } = process.env;
const defaults: WechatSignatureConfig = {
  appId: WECHAT_APP_ID!,
  appSecret: WECHAT_APP_SECRET!,
};

class WechatSignature {
  public config: WechatSignatureConfig;
  public cache;

  constructor(inConfig?: WechatSignatureConfig) {
    this.config = { ...defaults, ...inConfig };
    this.cache = new NodeCache({ checkperiod: 7000 }); // weixin default:  7200
  }

  public static instance;

  public static async get(inUrl: string, inConfig?: WechatSignatureConfig) {
    if (!WechatSignature.instance) WechatSignature.instance = new WechatSignature(inConfig);
    return await WechatSignature.instance.get(inUrl);
  }

  async get(inUrl: string) {
    const accessToken = await this.getAccessToken();
    const jsTicket = await this.getJsTicket(accessToken);
    const signature = await this.getSiganature(inUrl, jsTicket);
    return signature;
  }

  async getAccessToken() {
    const cache = this.cache.get('db_access_token');
    if (cache) return cache;
    const freshAccessToken = await this.getFreshAcessToken();
    this.cache.set('db_access_token', freshAccessToken, freshAccessToken.expires_in - 60 * 10);
    return freshAccessToken;
  }

  // step1: get access_token
  async getFreshAcessToken() {
    const { appId, appSecret } = this.config;
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    return await fetch(url).then((r) => r.json());
  }

  // step2: get jsapi_ticket
  async getJsTicket(inJsTicketData) {
    const { access_token } = inJsTicketData;
    const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    return await fetch(url).then((r) => r.json());
  }

  // step3: get signature
  async getSiganature(inUrl, inSignatureData) {
    const { jsapi_ticket } = inSignatureData;
    const { appId } = this.config;
    const nonceStr = this.getNonceStr();
    const timestamp = this.getTimestamp();
    const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${inUrl}`;
    const signature = sha1(str);
    return {
      appId,
      timestamp,
      nonceStr,
      signature,
      url: inUrl,
    };
  }

  private getNonceStr() {
    return Math.random().toString(36).substring(2, 15);
  }

  private getTimestamp() {
    return parseInt((Date.now() / 1000).toString(), 10);
  }
}

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = WechatSignature;
}

export default WechatSignature;
