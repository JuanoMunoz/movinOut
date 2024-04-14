import Todo from "../model/Todo";
import crypto from 'crypto'
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import User from "../model/User";
const extractJWTUSER = async(authorization: string| undefined ) => {
    if (authorization !== undefined) {
        const token = authorization.split(' ')[1]
        const { email }: any = jwt.decode(token);
        const userFounded = await User.findOne({ email: email })
        return userFounded
    }
    throw new Error('You must provide a JSONWEBTOKEN ')
}
export default class TodoController{
    
    static async getAllTodos(req: Request, res: Response) {

        try {
            const user = await extractJWTUSER(req.headers.authorization)
            const todos = await Todo.find({user: user});
            res.status(200).json({
                status: 200,
                items: {
                    todos: todos
                    
                }
            })
        } catch (e: any) {
            res.status(400).json({
                status: 400,
                items: {msg: e?.message}
            })
        }

}
    static async updateTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (Object.keys(req.body).length == 0) throw new Error('YOU NEED TO PROVIDE SOME INFO TO UPDATE')
            const toDoUpdate = await Todo.findOneAndUpdate({id: id},req.body)
            res.status(200).json({
                status: 200,
                items: {
                    msg: 'TODO UPDATED SUCCESFULLY',
                    todos: toDoUpdate
                    
                }
            })
        } catch (e: any) {
            res.status(400).json({
                status: 400,
                items: {msg: e?.message}
            })
        }

}
    static async deleteTodo(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const toDelete = await Todo.findOneAndDelete({id: id})
            res.status(200).json({
                status: 200,
                items: {
                    msg: 'TODO DELETED SUCCESFULLY!',
                    todos: toDelete
                }
            })
        } catch (e: any) {
            res.status(400).json({
                status: 400,
                items: {
                    msg: e?.message}
            })
        }

}
    static async insertTodo(req: Request, res: Response){
        try {
            const { name, state }: { name?: string, state?: boolean } = req.body;
            const userJTW = await extractJWTUSER(req.headers.authorization);
            if (name == undefined || state == undefined) { throw new Error('THERE IS SOME DATA MISSING NAME - STATE - EMAIL') }
            const user = await User.findOne({ email: userJTW?.email });
            if (user != null && state != undefined)  {  
                const todos = new Todo({ id: crypto.randomUUID(), name, state, user: user });
                await todos.save()
                res.status(201).json({
                    status: 201,
                    items: {
                        todos: todos
                    }
                })
            }
        } catch (e: any) {
            res.status(400).json({
                status: 400,
                items: {msg: e?.message}
            })
        }
    }
}