import User from "../model/User";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { log } from "console";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { emit } from "process";
import { config } from "dotenv";
import { Register } from "../types/userTypes";
config()
export default class UserController{
    static async getAllUser(req: Request, res: Response):Promise<void>{
        try {
            const users = await User.find();
            res.status(200).json({
                status: 200,
                items: {
                    msg: 'Here is the list of users',
                    users
                }
            })

        } catch (e: any) {
            res.status(500).json({
                status: 500,
                items: {msg: e?.message}
            })
        }
    }
    static async deleteUser(req: Request, res: Response):Promise<void>{
        try {
            const { id } = req.params
            const user = await User.findOneAndDelete({id: id});
            res.status(200).json({
                status: 200,
                items: {
                    msg: 'user deleted succesfully',
                    user
                }
            })

        } catch (e: any) {
            res.status(500).
            json({
                status: 500,
                items: {msg: e?.message}
            })
        }
    }
    static async getUser(req: Request, res: Response):Promise<void>{
        try {
            const { id }= req.params
            const user = await User.find({id: id});
            res.status(200).json({
                status: 200,
                items: {
                    msg: 'Here is the user',
                    user
                }
            })

        } catch (e: any) {
            res.status(500).json({
                status: 500,
                items: {msg: e?.message}
            })
        }
    }
    static async login(req: Request, res: Response):Promise<void>{
        try {
            const { email, password } = req.body            
            const userTryingToAccess: Register | null = await User.findOne({ email: email })

            if (userTryingToAccess == null) {
                throw new Error('the user does not exist')
            } else {
                const compare = await bcrypt.compare(password, userTryingToAccess.password)
                if (!compare) throw new Error('Password incorrect')
                const { nickname, id } = userTryingToAccess
                //jwt
                const token = jwt.sign({ email, id, nickname }, process.env.SECRET_KEY as string, { expiresIn: '1d' })
                res.status(200).json({
                    status: 200,
                    items: {
                        msg: 'Welcome to Movin Out',
                        token,
                        user: userTryingToAccess
                    }
                })
            }
        } catch(e: any) {
            res.status(500).json({
                status: 500,
                items: { msg: e?.message }
            })
        }
    }
    static async register(req: Request, res: Response):Promise<void>{
        try {
            const { email, password, nickname, }: Register = req.body
            const thereIsAlreadyAUser = await User.find({ email: email })
            if(thereIsAlreadyAUser.length !== 0)throw new Error('There is already a user')
            if (email == undefined) throw new Error('Data missing: Correo')
            if (password == undefined) throw new Error('Data missing: Password')
            if (nickname == undefined) throw new Error('Data missing: nickname')
            const adminList: string[] = ['juanmaster0910@gmail.com', 'juano@gmail.com', 'juanjosemunozva@gmail.com']
            const checkIfUserAdmin = adminList.filter(correo => {
                return correo === email
            })
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password,10)
            const newUser = new User({
                id: crypto.randomUUID(),
                email: email,
                password: hash,
                nickname: nickname,
                isAdmin: checkIfUserAdmin.length == 0 ? false : true
            });
            await newUser.save();
            res.status(201).json({
                status: 201,
                items: {
                    msg: 'user created succesfully',
                    user: newUser,
                }
            })

        } catch (e: any) {
            res.status(500).json({
                status: 500,
                items: {msg: e?.message}
            })
        }
    }
    static async updateUser(req: Request, res: Response):Promise<void>{
        try {
            const { id } = req.params
            const { nickname, password } = req.body
            if ( Object.keys(req.body).length == 0) throw new Error('You must provide the data to be updated')
            const updatedUser = await User.findOne({ id: id })
            if (updatedUser) { 
                if (nickname !== undefined) updatedUser.nickname = nickname
                if (password !== undefined) {
                    const hashPassword = await bcrypt.hash(password, 10)
                    updatedUser.password = hashPassword
                }
                await updatedUser.save()
            }
            
            res.status(201).json({
                status: 201,
                items: {
                    msg: 'user updated succesfully',
                    user: updatedUser
                }
            })

        } catch (e: any) {
            res.status(500).json({
                status: 500,
                items: {msg: e?.message}
            })
        }
    }
}