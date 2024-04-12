"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Todo_1 = __importDefault(require("../model/Todo"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const extractJWTUSER = (authorization) => __awaiter(void 0, void 0, void 0, function* () {
    if (authorization !== undefined) {
        const token = authorization.split(' ')[1];
        const { email } = jsonwebtoken_1.default.decode(token);
        const userFounded = yield User_1.default.findOne({ email: email });
        return userFounded;
    }
    throw new Error('You must provide a JSONWEBTOKEN ');
});
class TodoController {
    static getAllTodos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield extractJWTUSER(req.headers.authorization);
                const todos = yield Todo_1.default.find({ user: user });
                res.status(200).json({
                    status: 200,
                    items: {
                        todos: todos
                    }
                });
            }
            catch (e) {
                res.status(400).json({
                    status: 400,
                    error: e === null || e === void 0 ? void 0 : e.message
                });
            }
        });
    }
    static updateTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (Object.keys(req.body).length == 0)
                    throw new Error('YOU NEED TO PROVIDE SOME INFO TO UPDATE');
                const toDoUpdate = yield Todo_1.default.findOneAndUpdate({ id: id }, req.body);
                res.status(200).json({
                    status: 200,
                    items: {
                        msg: 'TODO UPDATED SUCCESFULLY',
                        todos: toDoUpdate
                    }
                });
            }
            catch (e) {
                res.status(400).json({
                    status: 400,
                    error: e === null || e === void 0 ? void 0 : e.message
                });
            }
        });
    }
    static deleteTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const toDelete = yield Todo_1.default.findOneAndDelete({ id: id });
                res.status(200).json({
                    status: 200,
                    items: {
                        msg: 'TODO DELETED SUCCESFULLY!',
                        todos: toDelete
                    }
                });
            }
            catch (e) {
                res.status(400).json({
                    status: 400,
                    error: e === null || e === void 0 ? void 0 : e.message
                });
            }
        });
    }
    static insertTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, state } = req.body;
                const userJTW = yield extractJWTUSER(req.headers.authorization);
                if (name == undefined || state == undefined) {
                    throw new Error('THERE IS SOME DATA MISSING NAME - STATE - EMAIL');
                }
                const user = yield User_1.default.findOne({ email: userJTW === null || userJTW === void 0 ? void 0 : userJTW.email });
                if (user != null && state != undefined) {
                    const todos = new Todo_1.default({ id: crypto_1.default.randomUUID(), name, state, user: user });
                    yield todos.save();
                    res.status(201).json({
                        status: 201,
                        items: {
                            todos: todos
                        }
                    });
                }
            }
            catch (e) {
                res.status(400).json({
                    status: 400,
                    error: e === null || e === void 0 ? void 0 : e.message
                });
            }
        });
    }
}
exports.default = TodoController;
