const userService = require("../services/user.service");

module.exports = {
    currentUser: async (ctx, next)  => {
        const {id} = ctx.currentUser
        ctx.body = await userService.getUserById(id)
        ctx.status = 200;

        next();
    },
    users: async (ctx, next) => {
        ctx.body = await userService.getAllUsers();
        ctx.status = 200;

        next();
    },
    changePassword: async (ctx, next) => {
        const {id} = ctx.currentUser;
        const {oldPassword, newPassword} = ctx.request.body;
        const res = await userService.changePassword(id, oldPassword, newPassword);

        if(!res)  {
            ctx.body = {
                message: "Incorrect old password!"
            }
            ctx.status = 404;
        } else {
            ctx.body = res;
            ctx.status = 200;
        }

        next();
    },
    createNewUser: async (ctx, next) => {
        const {username, email, password, role} = ctx.request.body
        const user = await userService.getUserByNameOrEmail(username, email);

        if (user) {
            ctx.body = {
                message: "Username or email is already taken"
            }
            ctx.status = 404;
        } else {
            const createdUser = await userService.createUser(username, email, password, role)
            ctx.body = {
                message: "User was created",
                user: {
                    id: createdUser.id,
                    email: createdUser.email,
                    username: createdUser.username
                }
            }
            ctx.status = 200;
        }

        next();
    },
    deleteUser: async (ctx, next) => {
        const {id} = ctx.query
        ctx.body = userService.deleteUserById(id)
        ctx.status = 200;

        next();
    }
}
