// @flow
import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import serverless from 'serverless-http';
import authToken from 'lib/middlewares/authToken';
import router from './router';

export default class Server {
  app: Koa;

  constructor() {
    this.app = new Koa();
    this.middleware();
  }

  middleware(): void {
    const { app } = this;
    app.use(authToken);
    app.use(bodyParser());
    app.use(router.routes())
      .use(router.allowedMethods());
  }

  listen(port: number): void {
    const { app } = this;
    app.listen(port);
    console.log('Listening to port', port);
  }

  serverless(): any {
    const { app } = this;
    return serverless(app);
  }
}
