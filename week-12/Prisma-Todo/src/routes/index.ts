import express from "express";
import { userRoute } from './user';
import { todoRouter } from "./todo";
export const indexRouter = express.Router();

indexRouter.use('/user',userRoute);
indexRouter.use('/todo',todoRouter);