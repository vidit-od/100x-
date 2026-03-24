import {Router} from "express"
import SignupRouter from "./Signup.js";
import LoginRouter from "./Login.js";
import MeRouter from "./Me.js";

const BackendRouter = Router()

BackendRouter.use("/signup", SignupRouter);
BackendRouter.use("/login",LoginRouter);
BackendRouter.use("/me",MeRouter);

export default BackendRouter;
