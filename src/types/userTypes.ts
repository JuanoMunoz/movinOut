import { ObjectId } from "mongoose"

export type Register = {
    _id?: ObjectId,
    id?: string,
    email: string,
    password: string,
    nickname: string,
    isAdmin: boolean
}
export interface TODO{
    id: string,
    name: string
    state: boolean,
    user: Register 
}