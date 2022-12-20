import Koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import body from 'koa-body';

const app = new Koa();
const router = new Router();
router.prefix('/dang');

router.get('/test', async (ctx: Koa.Context) => {
  ctx.body = 'test page';
});

router.use(json());
router.use(body());

app.use(router.routes());
app.listen(3002);
console.log('server running on port 3002');
