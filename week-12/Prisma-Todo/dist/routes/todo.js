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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
exports.todoRouter = express_1.default.Router();
const client = new client_1.PrismaClient();
exports.todoRouter.get('/:userid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.userid;
    client.$connect();
    const user = yield client.users.findUnique({
        where: {
            username: username
        }
    });
    if (user == null)
        return res.status(400).json({ msg: "no such user" });
    const todos = yield client.todo.findMany({
        where: {
            user_id: user === null || user === void 0 ? void 0 : user.id
        }
    });
    res.status(200).json({
        todos
    });
}));
exports.todoRouter.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, title, description } = req.body;
    const user = yield client.users.findUnique({
        where: {
            username
        }
    });
    if (user == null)
        return res.status(400).json({ msg: 'no such user exist' });
    const response = yield client.todo.create({
        data: {
            title,
            description,
            user_id: user === null || user === void 0 ? void 0 : user.id
        }
    });
    res.status(200).json({
        msg: 'todo created',
        response
    });
}));
exports.todoRouter.put('/completed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo_id = req.body.todo_id;
        const response = yield client.todo.update({
            where: {
                id: todo_id
            },
            data: {
                done: true
            }
        });
        res.status(200).json({
            response
        });
    }
    catch (_a) {
        res.status(400).json({ msg: 'invalid' });
    }
}));
