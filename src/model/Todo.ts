import { model, Schema } from "mongoose";
import { TODO } from "../types/userTypes";
const todoSchema = new Schema<TODO>({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Boolean,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }

}, {
    timestamps: true,
    versionKey: false
})
export default model('TODO',todoSchema)