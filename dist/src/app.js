"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("./database");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific HTTP methods
    next();
});
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/todos', todo_routes_1.default);
app.get('/', (req, res) => {
    res.redirect('/api/v1/');
});
app.listen(PORT, () => {
    console.log('Listening on port 3000');
});
exports.default = app;