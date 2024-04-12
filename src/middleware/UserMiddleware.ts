import { Request, Response, NextFunction } from "express";
import { Register } from "../types/userTypes";
import bcrypt from 'bcrypt'
import jwt, {JwtPayload } from 'jsonwebtoken'
import User from "../model/User";
import { error } from "console";
export const validateToken = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorization } = req.headers;
    if (typeof authorization == 'string') {
        try {
            const token = authorization.split(' ')[1]
            const {email}: any = jwt.verify(token, process.env.SECRET_KEY as string)
            const user: Register[] = await User.find({ email: email})
            if (user.length == 0) throw new Error('TRY RELOGGING - GOT A PROBLEM WITH YOUR TOKEN')
            next()
        } catch (e: any) {
            res.status(403).json({
                status: 500,
                error: e?.message
            })
        }
    } else {
        res.status(403).json({
            status: 500,
            error: 'YOU DONT HAVE PERMISSIONS TO SEE THIS'
        })
    }
}

export const authorization = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    try {
        const { authorization } = req.headers
        const token: any = authorization?.split(' ')[1]
        const { email}: any = jwt.decode(token)
        const user: Register[] = await User.find({ email: email })
        if (user[0].isAdmin) {
            next();
            return
        }
        if ((req.method == 'PUT' || req.method == 'DELETE') && req.params.id == user[0].id) {
            next();
            return
        }
       
        throw new Error('YOU DONT HAVE AUTHORIZATION TO DO THIS')
    } catch (e: any) {
        res.status(403).json({
                status: 403,
                error: e?.message
            })
    }
}