import hello from 'hellojs';

hello.init({
    github: '2620104e34dccc118b5e',
  }, {
    redirect_uri: 'callback',
});

export const githubLogin = () =>  hello.login('github');

window.hello = hello;