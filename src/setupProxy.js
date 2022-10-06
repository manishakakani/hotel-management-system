const { createProxyMiddleware } = require("http-proxy-middleware");
const backend = process.env.REACT_APP_BACKEND;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: backend,
      changeOrigin: true,
    })
  );
};
