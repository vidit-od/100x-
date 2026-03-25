import {Router} from "express"
import SignupRouter from "./Signup.js";
import LoginRouter from "./Login.js";
import MeRouter from "./Me.js";

const AuthRouter = Router()

AuthRouter.use("/signup", SignupRouter);
AuthRouter.use("/login",LoginRouter);
AuthRouter.use("/me",MeRouter);

export default AuthRouter;
