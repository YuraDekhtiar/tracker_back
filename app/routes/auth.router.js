const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const authController = require("../controllers/auth.controller");
const Router = require('koa-router');

const authRouter = new Router();

authRouter
    .post('/auth/login', validation(schemes.login), authController.login)
    .post('/auth/refresh-token', validation(schemes.token), authController.refreshToken)
    .post('/auth/logout', validation(schemes.token), authController.logout)

module.exports = authRouter.routes();
