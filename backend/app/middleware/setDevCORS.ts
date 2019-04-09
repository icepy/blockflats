module.exports = (_, app) => {
  return async function setDevCORS(ctx, next) {
    if (app.config.env === 'local') {
      ctx.set('Access-Control-Allow-Origin', 'http://localhost');
      ctx.set('Access-Control-Allow-Headers', 'X-Requested-With');
      ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
      ctx.set('Access-Control-Allow-Credentials', true);
      ctx.set('X-Powered-By', '3.2.1');
    }
    await next();
  };
};
