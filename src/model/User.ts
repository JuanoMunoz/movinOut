import { model, Schema } from 'mongoose'
interface IUser{
    id: string,
    email: string,
    password: string,
    nickname: string
    isAdmin: boolean
}
const userSchema = new Schema<IUser>({
    id: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})
export default model('User', userSchema);