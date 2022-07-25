const Koa = require('koa');
const { PORT } = require('./config/server.config.js')
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');

const errorHandler = require('./middleware/error.middleware');
const {privateRouter, publicRouter} = require("./routes");

const app = new Koa();
app.use(errorHandler);
app.use(bodyParser());
app.use(cors());
app.use(privateRouter.routes());
app.use(publicRouter.routes());


app.listen(PORT, () =>
    console.log(`server start at -> http://127.0.0.1:${PORT}`)
);
