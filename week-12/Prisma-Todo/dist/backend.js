"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use('/', routes_1.indexRouter);
app.listen(PORT, () => {
    console.log(`Listining at PORT ${PORT}`);
});
