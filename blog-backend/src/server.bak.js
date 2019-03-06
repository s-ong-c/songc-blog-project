import Koa from 'koa';
import serverless from 'serverless-http';
import router from './router';
const app = new Koa();


app.use(router.routes())
    .use(router.allowedMethods());
app.use((ctx) =>{
    ctx.body = 'hello'
});

if( process.env.APP_ENV==='local'){
app.listen(4000, (err) =>{
    if(err){
        return console.log(err);
    }
    console.log('Server is running on port 4000');
});
}

export const handler = serverless(app);