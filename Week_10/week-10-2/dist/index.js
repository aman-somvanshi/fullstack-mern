"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
// Above two lines are similar to
// import mongoose from "mongoose"
// mongoose.connect()
function insertUser(email, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.users.create({
            data: {
                email,
                password,
                firstName,
                lastName
            },
            select: {
                id: true,
                password: true
            }
        });
        console.log(res);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.users.update({
            where: {
                email: username
            },
            data: {
                firstName,
                lastName
            }
        });
        console.log(res);
    });
}
// updateUser("user@gmail.com", {
//     firstName: "MS",
//     lastName: "Dhoni"
// })
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.users.findFirst({
            where: {
                email: username
            }
        });
        console.log(res);
    });
}
getUser("user@gmail.com");
