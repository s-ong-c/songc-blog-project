import hello from 'hellojs';

hello.init({
    github: '2620104e34dccc118b5e',
    facebook: '197650157785115',
    google: '844251829789-1svc6l57a0eq7hpbnaa8ts0ttt35kmvp.apps.googleusercontent.com',
  }, {
    redirect_uri: 'callback',
});

export const github = (): Promise<*> =>  hello.login('github');
export const facebook = (): Promise<*> =>  hello.login('facebook', { scope: 'email, public_profile' });
export const google = (): Promise<*> =>  hello.login('google', 
{
    scope: 'https://www.googleapis.com/auth/userinfo.email',
});