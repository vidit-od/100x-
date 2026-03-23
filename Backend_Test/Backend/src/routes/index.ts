import {Router} from "express"
import SignupRouter from "./Signup.js";

const BackendRouter = Router()

BackendRouter.use("/signup", SignupRouter);

export default BackendRouter;
