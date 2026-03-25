import { Router } from "express";
import jwt  from "jsonwebtoken";
import { User } from "../model/User";
import type { Request, Response, NextFunction } from "express";
import type { HydratedDocument } from "mongoose";
import type { IUser } from "../model/User";
import { ClassSchema } from "../utils/zodSchemas";
import { Class, type IClass } from "../model/Class";

interface AuthRequest extends Request {
    user ?: HydratedDocument<IUser>
}

const ClassRouter = Router();

ClassRouter.use("", async(req:AuthRequest, res: Response, next : NextFunction) =>{
    const token = req.headers["authorization"];
    if(!token) return res.status(401).json({
        success : false,
        error : "Unauthorized, token missing or invalid"
    })

    const stripToken = token.replace(/^Bearer\s+/ , '');
    let email : String | jwt.JwtPayload
    try{
        email = jwt.verify(stripToken, "secret");
    }
    catch{
        return res.status(401).json({
            success : false,
            error : "Unauthorized, token missing or invalid"
        })
    }
    const user = await User.findOne({email:email});
    if(user) req.user = user;
    next();
})

ClassRouter.post("", async(req:AuthRequest, res: Response)=>{
    const user = req.user;

    if(!user || user.role == "student"){
        return res.status(403).json({
            success : false,
            error : 'Forbidden, teacher access required'
        })
    }

    const body = req.body;
    const result = ClassSchema.safeParse(body);

    if(!result.success) return res.status(400).json({
        success : false,
        error: "Invalid request schema"
    })

    const data = result.data;
    const newClass : IClass = await Class.create({
        className : data.className,
        teacherId : user._id,
        studentIds : []
    })

    return res.status(201).json({
        success : true,
        data : {
            _id : newClass._id,
            className : newClass.className,
            teacherId : newClass.teacherId,
            studentIds : newClass.studentIds
        }
    })
})

export default ClassRouter;
