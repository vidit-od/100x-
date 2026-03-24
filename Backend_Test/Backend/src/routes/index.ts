import {Router} from "express"
import SignupRouter from "./Signup.js";
import LoginRouter from "./Login.js";

const BackendRouter = Router()

BackendRouter.use("/signup", SignupRouter);
BackendRouter.use("/login",LoginRouter);

export default BackendRouter;
