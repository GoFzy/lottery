import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import bodyParser from 'koa-bodyparser';
import staticFile from 'koa-static';

const app = new Koa();
const router = new Router();

import lottery from './routes/lottery/lottery';

app
  .use(async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
      ctx.status = 404;         //由于错误处理中间件的存在，需要重新设置一下状态码
      ctx.body = '未找到该页面'
    }
  })
  .use(bodyParser())
  .use(staticFile(path.resolve(__dirname, 'public')));

  router.use('/api/lottery', lottery.routes());

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
});