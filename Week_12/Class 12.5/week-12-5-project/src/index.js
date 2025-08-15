"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function insertUser(username, password, firstName, lastName, email) {
    prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName,
            email
        }
    });
}
insertUser("aman_rookie", "aman123", "aman", "rookie", "aman@rookie.com");
//# sourceMappingURL=index.js.map