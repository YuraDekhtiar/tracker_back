const Koa = require('koa');
const { router } = require('./routes/index');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

const PORT = 3000;

const app = new Koa();
app.use(bodyParser());
app.use(cors());
app.use(router.routes());

app.use(async (ctx, next) => {
    try {
        await next();
        if(ctx.status === 404) ctx.throw(404);
    } catch (e) {
        const message = {"message":`route < ${ctx.url} > not found`}
        ctx.status = 404;
        ctx.body = message;
    }
});

app.listen(PORT, () =>
    console.log(`server start at -> http://127.0.0.1:${PORT}`)
);
