# wechat-signature
> Make it easier to get wechat access_token, jsapi_ticket and sign url.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/wechat-signature
```

## usage
```js
import WechatSignature from '@jswork/wechat-signature';

const wechatSignature = new WechatSignature({
  appId: 'wx1231312314',
  appSecret: 'eWsJGHef00IzNpDkenFEUOLAvAgYHe9F'
});

const sign = await wechatSignature.get('https://www.baidu.com');

/*
{
  "appId": "wx1231312314",
  "timestamp": 1691760434,
  "nonceStr": "ibt50tqybof",
  "signature": "0eeaf6427085c1ba8d22240a94818167293783df",
  "url": "https://www.baidu.com"
}
*/
```

## license
Code released under [the MIT license](https://github.com/afeiship/wechat-signature/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/wechat-signature
[version-url]: https://npmjs.org/package/@jswork/wechat-signature

[license-image]: https://img.shields.io/npm/l/@jswork/wechat-signature
[license-url]: https://github.com/afeiship/wechat-signature/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/wechat-signature
[size-url]: https://github.com/afeiship/wechat-signature/blob/master/dist/wechat-signature.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/wechat-signature
[download-url]: https://www.npmjs.com/package/@jswork/wechat-signature
