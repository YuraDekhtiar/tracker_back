const Koa = require('koa');
const { router } = require('./routes/index');
const { PORT } = require('./config/server.config.js')
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

const errorHandler = require('./middleware/error.middleware');
const error404Handler = require('./middleware/error404.middleware');



const app = new Koa();
app.use(errorHandler);
app.use(error404Handler);
app.use(bodyParser());
app.use(cors());
app.use(router.routes());


app.listen(PORT, () =>
    console.log(`server start at -> http://127.0.0.1:${PORT}`)
);
