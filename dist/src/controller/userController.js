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
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class UserController {
    static getAllUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.find();
                res.status(200).json({
                    status: 200,
                    items: {
                        msg: 'Here is the list of users',
                        users
                    }
                });
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    items: { msg: e === null || e === void 0 ? void 0 : e.message }
                });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.findOneAndDelete({ id: id });
                res.status(200).json({
                    status: 200,
                    items: {
                        msg: 'user deleted succesfully',
                        user
                    }
                });
            }
            catch (e) {
                res.status(500).
                    json({
                    status: 500,
                    items: { msg: e === null || e === void 0 ? void 0 : e.message }
                });
            }
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.find({ id: id });
                res.status(200).json({
                    status: 200,
                    items: {
                        msg: 'Here is the user',
                        user
                    }
                });
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    items: { msg: e === null || e === void 0 ? void 0 : e.message }
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const userTryingToAccess = yield User_1.default.findOne({ email: email });
                if (userTryingToAccess == null) {
                    throw new Error('the user does not exist');
                }
                else {
                    const compare = yield bcrypt_1.default.compare(password, userTryingToAccess.password);
                    if (!compare)
                        throw new Error('Password incorrect');
                    const { nickname, id } = userTryingToAccess;
                    //jwt
                    const token = jsonwebtoken_1.default.sign({ email, id, nickname }, process.env.SECRET_KEY, { expiresIn: '1d' });
                    res.status(200).json({
                        status: 200,
                        items: {
                            msg: 'Welcome to Movin Out',
                            token,
                            user: userTryingToAccess
                        }
                    });
                }
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    items: { msg: e === null || e === void 0 ? void 0 : e.message }
                });
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, nickname, } = req.body;
                const thereIsAlreadyAUser = yield User_1.default.find({ email: email });
                if (thereIsAlreadyAUser.length !== 0)
                    throw new Error('There is already a user');
                if (email == undefined)
                    throw new Error('Data missing: Correo');
                if (password == undefined)
                    throw new Error('Data missing: Password');
                if (nickname == undefined)
                    throw new Error('Data missing: nickname');
                const adminList = ['juanmaster0910@gmail.com', 'juano@gmail.com', 'juanjosemunozva@gmail.com'];
                const checkIfUserAdmin = adminList.filter(correo => {
                    return correo === email;
                });
                const salt = yield bcrypt_1.default.genSalt(10);
                const hash = yield bcrypt_1.default.hash(password, 10);
                const newUser = new User_1.default({
                    id: crypto_1.default.randomUUID(),
                    email: email,
                    password: hash,
                    nickname: nickname,
                    isAdmin: checkIfUserAdmin.length == 0 ? false : true
                });
                yield newUser.save();
                res.status(201).json({
                    status: 201,
                    items: {
                        msg: 'user created succesfully',
                        user: newUser,
                    }
                });
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    items: { msg: e === null || e === void 0 ? void 0 : e.message }
                });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { nickname, password } = req.body;
                if (Object.keys(req.body).length == 0)
                    throw new Error('You must provide the data to be updated');
                const updatedUser = yield User_1.default.findOne({ id: id });
                if (updatedUser) {
                    if (nickname !== undefined)
                        updatedUser.nickname = nickname;
                    if (password !== undefined) {
                        const hashPassword = yield bcrypt_1.default.hash(password, 10);
                        updatedUser.password = hashPassword;
                    }
                    yield updatedUser.save();
                }
                res.status(201).json({
                    status: 201,
                    items: {
                        msg: 'user updated succesfully',
                        user: updatedUser
                    }
                });
            }
            catch (e) {
                res.status(500).json({
                    status: 500,
                    items: { msg: e === null || e === void 0 ? void 0 : e.message }
                });
            }
        });
    }
}
exports.default = UserController;
