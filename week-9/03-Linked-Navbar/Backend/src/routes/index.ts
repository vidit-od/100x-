import express from "express";

const RootRouter = express.Router();

import signupRouter from './user';
import NavRouter from "./navbar";

RootRouter.use('/user', signupRouter);
RootRouter.use('/nav',NavRouter);

export default RootRouter;