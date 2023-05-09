import Koa from 'koa';
import LoadAllRoutes from './common/LoadAllRoutes';

const app = new Koa();

LoadAllRoutes.init(app);
