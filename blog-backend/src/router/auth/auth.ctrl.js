// @flow
import type { Context} from 'koa';
import {User, UserProfile } from 'database/models';

export const createLocalAccount =async(ctx:Context): Promise<*> =>{
    type requsetBody = {
        email: string,
        password: string,
        username: string
    };
    const body: bodySchema = ((ctx.request.body: any): bodySchema);
    const { 
        email,
        password,
        username

    } = body;
    console.log(email,password,username)
   ctx.body= {
    success: true,
   };

};