import Koa from 'koa';
import path from 'path';
import fs from 'fs';
import Router from 'koa-router';
import json from 'koa-json';
import body from 'koa-body';

class LoadAllRoutes {
  app!: Koa;

  static loadRoutes: LoadAllRoutes = new LoadAllRoutes();

  init(app: Koa) {
    this.app = app;
    this.LoadAllRoutes();
  }

  getRouterFiles(dir: string): string[] {
    const filePath: string[] = [];
    const fileNames = fs.readdirSync(dir);

    if (fileNames?.length > 0) {
      fileNames.forEach((fileName) => {
        const name = dir + '/' + fileName;
        filePath.push(name);
      });
    }
    return filePath;
  }

  getRouterClasses() {
    const dir = path.join(__dirname, '../router');
    return this.getRouterFiles(dir);
  }

  isRouter(obj: any): obj is Router {
    // 判断是否是路由
    return obj instanceof Router;
  }

  LoadAllRoutes() {
    const rootRouter = new Router();
    rootRouter.prefix('/dang');

    rootRouter.use(json());
    rootRouter.use(body());

    let files = this.getRouterClasses();
    files.forEach(async (file) => {
      // 获取文件后缀
      const extname = path.extname(file);
      if (extname === '.ts') {
        const module = await import(file);
        const childRouter = module.default;
        if (this.isRouter(childRouter)) {
          rootRouter
            .use(childRouter.routes())
            .use(childRouter.allowedMethods());
        }
      }
    });

    this.app.use(rootRouter.routes());
    this.app.listen(3002);
    console.log('server running on port 3002');
  }
}

export default LoadAllRoutes.loadRoutes;
