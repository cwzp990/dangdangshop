import Koa from 'koa';
import LoadAllRoutes from './common/loadAllRoutes';

const app = new Koa();

LoadAllRoutes.init(app);
