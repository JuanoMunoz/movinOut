"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const validateBody = (req, res, next) => {
    const bodyRequired = ["email" /* BODY.EMAIL */, "password" /* BODY.PASSWORD */, "nickname" /* BODY.NICKNAME */];
};
exports.validateBody = validateBody;
