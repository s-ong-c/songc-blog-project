// @flow
import Router from 'koa-router';
import auth from './auth';
import posts from './posts';
import me from './me';
import needsAuth from 'lib/middlewares/needsAuth';
import type { Context} from 'koa';
const router: Router = new Router();

router.use('/auth',auth.routes());
router.use('/posts', posts.routes());
router.use('/me', needsAuth, me.routes());
router.get('/check',(ctx: Context) => {
    ctx.body = {
        version: '1.0.0-alpha.0',
    };
});
export default router;