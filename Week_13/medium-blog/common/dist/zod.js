"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string().optional()
}); // This is a runtime variable and will be used in the backend
exports.signinInput = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6),
}); // This is a runtime variable and will be used in the backend
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean()
});
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    published: zod_1.default.boolean()
});
