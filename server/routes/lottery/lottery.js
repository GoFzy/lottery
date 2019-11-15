import Router from 'koa-router';
import myJson from './config.json';
const router = new Router();

router.get('/', async(ctx) => {
  let randomNum = Math.random();
  if(randomNum < 0.05) {
    // 概率为5%--100元话费
    myJson.result = 1;
  }
  else if (randomNum < 0.2) {
    // 概率为15%--10元话费
    myJson.result = 2;
  }
  else if(randomNum < 0.5) {
    // 概率为30%--5000积分
    myJson.result = 3;
  }
  else {
    // 概率为70%--谢谢参与
    myJson.result = 4;
  }
  ctx.body = myJson;
})

export default router;