import WechatSign from '../src';

describe('api.basic', () => {
  test('appid/secret from env', async () => {
    // WECHAT_APP_ID, WECHAT_APP_SECRET from `env`
    const res = await WechatSign.get('http://www.baidu.com');
    console.log('🧰 res: ', res);
    expect(typeof res.signature).toBe('string');
  });
});
