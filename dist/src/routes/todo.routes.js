"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = __importDefault(require("../controller/todoController"));
const todoRouter = (0, express_1.Router)();
const UserMiddleware_1 = require("../middleware/UserMiddleware");
todoRouter.get('/', [UserMiddleware_1.validateToken], todoController_1.default.getAllTodos)
    .post('/', [UserMiddleware_1.validateToken], todoController_1.default.insertTodo)
    .delete('/:id', [UserMiddleware_1.validateToken, UserMiddleware_1.TODOauthorization], todoController_1.default.deleteTodo)
    .put('/:id', [UserMiddleware_1.validateToken, UserMiddleware_1.TODOauthorization], todoController_1.default.updateTodo);
exports.default = todoRouter;
