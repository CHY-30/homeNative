const { getDefaultConfig } = require('expo/metro-config');
const { createProxyMiddleware } = require('http-proxy-middleware');

const config = getDefaultConfig(__dirname);

// 개발 서버(Metro)에 프록시 미들웨어 추가
config.server = {
  enhanceMiddleware: (metroMiddleware) => {
    return (req, res, next) => {
      // /api 로 시작하는 모든 요청을 target 서버로 전달
      if (req.url.startsWith('/freeApi')) {
        return createProxyMiddleware({
          target: 'https://dev.gongsiltoday.com',
          changeOrigin: true,
          secure: false,
        })(req, res, next);
      }
      return metroMiddleware(req, res, next);
    };
  },
};

module.exports = config;