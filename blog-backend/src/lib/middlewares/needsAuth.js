// @flow
import type { Context } from 'koa';

// 만약 유저가 없다면 리턴
// 401  
export default (ctx: Context, next: () => Promise<*>) => {
    if (!ctx.user){
        ctx.status = 401;
        return;
    }
    return next();
}