require('dotenv').config()
const Koa = require('koa');
const { PORT } = require('./config/server.config.js')
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const db = require("./models");
const errorHandler = require('./middlewares/error.middleware');
const { privateRouter, publicRouter } = require('./routes/index');

const app = new Koa();
app.use(errorHandler);
app.use(bodyParser());
app.use(cors());
app.use(publicRouter.routes());
app.use(privateRouter.routes());

// database
db.sequelize.sync().then(() => console.log(`Synchronization database success`));

app.listen(PORT, () =>
    console.log(`server start at -> http://127.0.0.1:${PORT}`)
);
