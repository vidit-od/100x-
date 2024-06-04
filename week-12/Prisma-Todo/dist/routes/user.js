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
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
exports.userRoute = express_1.default.Router();
const client = new client_1.PrismaClient();
exports.userRoute.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    client.$connect();
    console.log(req.body);
    try {
        const { username, password, firstname, lastname } = req.body;
        const response = yield client.users.create({
            data: {
                username,
                password,
                firstname,
                lastname
            }
        });
        res.status(200).json({ msg: 'New user created', user: response });
    }
    catch (_a) {
        res.status(400).json({ msg: 'invalid ' });
    }
    client.$disconnect();
}));
exports.userRoute.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        client.$connect();
        const response = yield client.users.findUnique({
            where: {
                username
            }
        });
        res.status(200).json({ msg: "success", user: response });
    }
    catch (_b) {
        res.status(400).json({ msg: 'invalid' });
    }
}));
exports.userRoute.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstname, lastname, password } = req.body;
        client.$connect();
        const response = yield client.users.update({
            where: {
                username: username,
            },
            data: {
                firstname,
                lastname,
                password,
            }
        });
        res.status(200).json({
            msg: 'updated',
            response,
        });
    }
    catch (_c) {
        res.status(400).json({ msg: 'invalid' });
    }
}));
