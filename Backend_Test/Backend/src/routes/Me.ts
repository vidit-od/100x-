import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { email, success } from "zod";
import { User } from "../model/User";
const MeRouter = Router();

MeRouter.get("",async(req: Request,res : Response)=>{
    try{
        const token = req.headers['authorization'];
        if(!token) return res.status(401).json({
            success : false,
            error : "Unauthorized, token missing or invalid"
        })

        const stripToken = token.replace(/^Bearer\s+/, '');
        const UserEmail = jwt.verify(stripToken , "secret");

        const user = await User.findOne({email : UserEmail});
        if(!user) throw Error();

        return res.status(200).json({
            success : true,
            data : {
                _id : user._id,
                email : user.email,
                role : user.role
            }
        })
    }
    catch{
        return res.status(401).json({
            success : false,
            error : "Unauthorized, token missing or invalid"
        })
    }

})

export default MeRouter;
