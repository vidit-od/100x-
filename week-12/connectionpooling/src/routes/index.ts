import express from "express";
import { userRoute } from './user';
import { todoRouter } from "./todo";
import { Hono } from "hono";

export const indexRouter = new Hono();

indexRouter.route('/user',userRoute);
indexRouter.route('/todo',todoRouter);