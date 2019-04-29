// @flow
import Router from 'koa-router';
import auth from './auth'
import type { Context} from 'koa';
const router: Router = new Router();

router.use('/auth',auth.routes());

export default router;router.get('/check',(ctx: Context) => {
    ctx.body = {
        version: '1.0.0-alpha.0',
    };
});