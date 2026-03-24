import { Router } from "express";
import type { Request, Response } from "express";
import { SignupSchema } from "../utils/zodSchemas";
import { ValidationError, ValidationErrorDuplicateEmail } from "../utils/errorCodes";
import { User, type IUser } from "../model/User";

const SignupRouter = Router();

SignupRouter.get("/health",(req: Request, res: Response)=>{
    return res.json({
        message : "Backend is up and running"
    });
});

SignupRouter.post("", async (req:Request, res:Response)=>{
    try{
        const body = req.body;
        const result = SignupSchema.safeParse(body);
        // input validation
        if(!result.success) return res.status(ValidationError.code).json({"success" : ValidationError.success, "error" : ValidationError.error})
        // check db if email already exists

        const data = result.data;
        const existingUser = await User.findOne({email : data.email});

        if (existingUser) return res.status(ValidationErrorDuplicateEmail.code).json({
            "success" : ValidationErrorDuplicateEmail.success,
            "error" : ValidationErrorDuplicateEmail.error
        })

        //create new user
        const user : IUser = await User.create({
            name : data.name,
            email : data.email,
            password : data.password,
            role : data.role
        })

        return res.status(201).json({
            "success" : true,
            "data" : {
                "_id" : user._id,
                "name" : user.name,
                "email" : user.email,
                "role" : data.role
            }

        })
    }
    catch(e){

    }
})

export default SignupRouter;
