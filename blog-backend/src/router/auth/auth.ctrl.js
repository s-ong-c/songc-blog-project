// @flow
import type { Context } from 'koa';
import Joi from 'joi';
import sendMail from '../../lib/sendMail';

import User from 'database/models/User';
import UserProfile from 'database/models/UserProfile';
import EmailAuth from 'database/models/EmailAuth';
import { generate, decode } from 'lib/token';

import type { UserModel} from 'database/models/User';
import type { UserProfileModel} from 'database/models/UserProfile';
import type { EmailAuthModel } from 'database/models/EmailAuth';

export const sendAuthEmail = async (ctx: Context): Promise<*> => {
  type BodySchema = {
    email: string
  };

  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
  });

  const result: any = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: result.error,
    };
    return;
  }

  try {
    const { email } : BodySchema = (ctx.request.body: any);
    const verification: EmailAuthModel = await EmailAuth.build({
      email,
    }).save();
    const data = await sendMail({
      to: email,
      subject: 'SONGC 이메일 회원가입',
      from: 'SONGC <verification@songc.io>',
      body: `
      <a href="https://songc.io"><img src="https://i.imgur.com/PMaYPoN.png" style="display: block; width: 500px; margin: 0 auto;"/></a>
      <div style="max-width: 100%; width: 400px; margin: 0 auto; padding: 1rem; text-align: justify; background: #f8f9fa; border: 1px solid #dee2e6; box-sizing: border-box; border-radius: 4px; color: #35495e; margin-top: 0.5rem; box-sizing: border-box;">
        <b style="black">SONGC 에 오신것을 환영합니다! </b>회원가입을 계속하시려면 하단의 링크를 클릭하세요. 만약에 실수로 가입하셨거나, 본인이 가입신청하지 않았다면, 이 메일을 무시하세요.
      </div>
      
      <a href="https://songc.io/register?code=${verification.code}" style="text-decoration: none; width: 400px; text-align:center; display:block; margin: 0 auto; margin-top: 1rem; background: #42b883; padding-top: 1rem; color: white; font-size: 1.25rem; padding-bottom: 1rem; font-weight: 600; border-radius: 4px;">SONGC 가입하기</a>
      
      <div style="text-align: center; margin-top: 1rem; color: #5ea2f7; font-size: 0.85rem;"><div>위 버튼을 클릭하시거나, 다음 링크를 열으세요: <br/> <a style="color: #b197fc;" href="https://songc.io/register?code=${verification.code}">https://songc.io/register?code=${verification.code}</a></div><br/><div>이 링크는 24시간동안 유효합니다. </div></div> `,

    })
    console.log(data);
    // sendVerificationEmail({
    //   email,
    //   code: verification.code,
    // });
  } catch (e) {
    ctx.throw(500, e);
  }
  ctx.body = {
    status: true,
  };
};

export const getCode = async (ctx: Context): Promise<*> => {
  const { code }  = ctx.params;

  try {
    const auth: EmailAuthModel = await EmailAuth.findCode(code);
    if (!auth){
      ctx.status = 404;
      return;
    }
    const { email } = auth;
    
    const registerToken = await generate({ email } , {expiresIn: '1h',subject: 'auth-register'});

    ctx.body = {
      email,
      registerToken,
    };

    await auth.use();
  } catch (e) {
    ctx.throw(500,e);
  }
};

export const createLocalAccount = async (ctx: Context): Promise<*> => {
  type BodySchema = {
    registerToken: string,
    form: {
      displayName: string,
      username: string,
      shortBio: string
    }
  };

  const schema = Joi.object().keys({
    registerToken: Joi.string().required(),
    form: Joi.object().keys({
      displayName: Joi.string().min(1).max(40),
      username: Joi.string().alphanum().min(3).max(16)
        .required(),
      shortBio: Joi.string().max(140),
    }).required(),
  });

  const result: any = Joi.validate(ctx.request.body, schema);
  console.log(result);
  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: result.error,
    };
    return;
  }

  const {
    registerToken,
    form: {
      username,
      shortBio,
      displayName,
    },
  }: BodySchema = (ctx.request.body: any);

  let decoded = null;

  try {
    decoded = await decode(registerToken);
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      name: 'INVALID_TOKEN',
    };
    return ;
  }
  const { email} = decoded;
  try {
      const [emailExists, usernameExists] = await Promise.all([
      User.findUser('email', email),
      User.findUser('username', username),
    ]);

    if (emailExists || usernameExists) {
      ctx.status = 409;
      ctx.body = {
        name: 'DUPLICATED_ACCOUNT',
        payload: emailExists ? 'email' : 'username',
      };
      return;
    }
  } catch (e) {
    console.log(e);
  }

  try {
    const user:User = await User.build({
      username,
      email,
    }).save();

     await UserProfile.build({
      fk_user_id: user.id,
      display_name: displayName,
      short_bio: shortBio,
    }).save();

    const token: string = await user.generateToken();

    // $flowFixMe: intersection bug
    ctx.cookies.set('token',token,{
      httpOnly:true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

  ctx.body ={
        user: {
          id: user.id,
          username: user.username,
          displayName,
        },
        token
      };

  } catch (e) {
    ctx.throw(500, e);
  }
};

export const localLogin = async (ctx: Context): Promise<*> =>{
  type BodySchema ={
    email?: string,
    password: string,
    username?: string
  };

  const { email, username, password}: BodySchema = (ctx.request.body: any);
  
  // email & username not given
  if(!(email || username)){
    console.log("ss");
      ctx.status = 401;
      ctx.body={
        name: 'LOGIN_FAILURE',
      };
      return;
  }
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
    username: Joi.string().alphanum().min(3).max(20),
  });
  
  // somehow wrong schema
  const result: any = Joi.validate(ctx.request.body, schema);
  if( result.error){
    ctx.status = 401;
    ctx.body = {
      name: 'LOGIN_FAILURE',
    };
    return; 
  }

  try{
    const value: any = email || username;
    const type: ('email' | 'username') = email ? 'email': 'username';

    const user: UserModel = await User.findUser(type, value);

    if(!user){
      ctx.status= 401;
      ctx.body= {
        name: 'LOGIN_FAILURE',
      }
      return;
    }
    console.log(user);
    
    
    const validated: boolean = await user.validatePassword(password);
    if(!validated){
      ctx.status= 401;
      ctx.body= {
        name: 'LOGIN_FAILURE',
      };
      return;
    }
    const token: string= await user.generateToken();

    // set-cookie
    // $flowFixMe: intersection bug
    ctx.cookies.set('access_token',token,{
      httpOnly:true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    ctx.body ={
      user: {
        id: user.id,
        username: user.username,
      },
      token
    };
  }catch(e){
    ctx.throw(500,e);
  }

};

export const check = async (ctx: Context): Promise<*>=>{
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }
  
  ctx.body = ctx.user;
}
