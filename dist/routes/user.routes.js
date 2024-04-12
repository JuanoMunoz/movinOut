"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const UserMiddleware_1 = require("../middleware/UserMiddleware");
const userRouter = (0, express_1.Router)();
userRouter.get('/', userController_1.default.getAllUser).get('/:id', userController_1.default.getUser)
    .post('/register', userController_1.default.register)
    .post('/login', userController_1.default.login)
    .delete('/:id', [UserMiddleware_1.validateToken, UserMiddleware_1.authorization], userController_1.default.deleteUser).put('/:id', [UserMiddleware_1.validateToken, UserMiddleware_1.authorization], userController_1.default.updateUser);
exports.default = userRouter;
