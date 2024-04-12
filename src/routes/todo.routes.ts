import { Router } from "express";
import TodoController from "../controller/todoController";
const todoRouter = Router();
import { validateToken, TODOauthorization, authorization } from "../middleware/UserMiddleware";
todoRouter.get('/',[validateToken], TodoController.getAllTodos)
    .post('/', [validateToken], TodoController.insertTodo)
    .delete('/:id', [validateToken, TODOauthorization], TodoController.deleteTodo)
    .put('/:id', [validateToken, TODOauthorization], TodoController.updateTodo)
export default todoRouter