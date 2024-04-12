"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(`mongodb+srv://juanMunoz:Amoelanime1@apirest.glytkh2.mongodb.net/movinout?retryWrites=true&w=majority&appName=ApiRest`).then(() => {
    console.log('conectado a atlas');
}).catch(e => console.error(e));
