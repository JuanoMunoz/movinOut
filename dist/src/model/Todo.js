"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
});
exports.default = (0, mongoose_1.model)('TODO', todoSchema);
