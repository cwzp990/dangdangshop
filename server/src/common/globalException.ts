import { Context, Next } from 'koa';
import { fail } from './ResResult';

const globalException = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.body = fail(err.message);
  }
};

export default globalException;
