import { Router } from "express";
import type { Request, Response } from "express";
import { LoginSchema } from "../utils/zodSchemas";
import { ValidationError } from "../utils/errorCodes";
import { User } from "../model/User";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const LoginRouter = Router();

LoginRouter.post("", async (req: Request, res: Response)=>{
    const body = req.body;
    const result = LoginSchema.safeParse(body);

    if(!result.success) return res.status(ValidationError.code).json({"success" : ValidationError.success, "error" : ValidationError.error})

    const data = result.data;
    const user = await User.findOne({email: data.email})
    const isMatch = (user) ? await bcrypt.compare(data.password, user?.password) : false;
    if(!user || !isMatch) return res.status(400).json({
        "success" : false,
        "error" : "Invalid email or password"
    })
    const token = `Bearer ` + jwt.sign(user.email, "secret");
    return res.status(200).json({
        success : true,
        data : {
            token : token
        }
    })
})

export default LoginRouter;
