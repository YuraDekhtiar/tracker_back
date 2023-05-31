const onlyAdmin = require("../middlewares/admin.middleware");
const userController = require("../controllers/user.controller");
const validation = require("../middlewares/validation.middleware");
const schemes = require("../validations");
const Router = require("koa-router");

const userRouter = new Router();

userRouter
    .get('/users', onlyAdmin, userController.users)
    .post('/users/create-new-user', onlyAdmin, validation(schemes.createNewUser), userController.createNewUser)
    .delete('/users/delete', onlyAdmin, validation(schemes.id, false), userController.deleteUser)
    .get('/profile', userController.currentUser)
    .put('/profile/change-pass', validation(schemes.changePassword), userController.changePassword)
    // Get all users without current group
    .get('/user/users-out-group', onlyAdmin, validation(schemes.id, false), userController.usersOutGroup)


module.exports = userRouter.routes();
