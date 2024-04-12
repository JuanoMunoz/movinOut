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
exports.authorization = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (typeof authorization == 'string') {
        try {
            const token = authorization.split(' ')[1];
            const { email } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            const user = yield User_1.default.find({ email: email });
            if (user.length == 0)
                throw new Error('TRY RELOGGING - GOT A PROBLEM WITH YOUR TOKEN');
            next();
        }
        catch (e) {
            res.status(403).json({
                status: 500,
                error: e === null || e === void 0 ? void 0 : e.message
            });
        }
    }
    else {
        res.status(403).json({
            status: 500,
            error: 'YOU DONT HAVE PERMISSIONS TO SEE THIS'
        });
    }
});
exports.validateToken = validateToken;
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(' ')[1];
        const { email } = jsonwebtoken_1.default.decode(token);
        const user = yield User_1.default.find({ email: email });
        if (user[0].isAdmin) {
            next();
            return;
        }
        if ((req.method == 'PUT' || req.method == 'DELETE') && req.params.id == user[0].id) {
            next();
            return;
        }
        throw new Error('YOU DONT HAVE AUTHORIZATION TO DO THIS');
    }
    catch (e) {
        res.status(403).json({
            status: 403,
            error: e === null || e === void 0 ? void 0 : e.message
        });
    }
});
exports.authorization = authorization;
