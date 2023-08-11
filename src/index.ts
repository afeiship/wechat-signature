declare var wx: any;

const WechatSignature = (): void => {
  console.log('hello');
};

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = WechatSignature;
}

export default WechatSignature;
