import Koa from 'koa';
import Router from 'koa-router';
import json from 'koa-json';
import body from 'koa-body';
import userRouter from './router/user';

const app = new Koa();
const router = new Router();
router.prefix('/dang');

router.get('/test', async (ctx: Koa.Context) => {
  ctx.body = 'test page';
});

router.use(json());
router.use(body());

// 一级路由加载二级路由
router.use(userRouter.routes(), userRouter.allowedMethods());
// 全局路由
app.use(router.routes());

app.listen(3002);
console.log('server running on port 3002');
