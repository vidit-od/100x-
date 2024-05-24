import {Request, Response, NextFunction} from 'express'
import  jwt, { JwtPayload } from 'jsonwebtoken';
import { Statuscode } from '../statuscodes';

declare global{
    namespace Express{
        interface Request{
            userid?: string|JwtPayload;
        }
    }
}

export function middleware(req:Request,res:Response,next:NextFunction){
    const AUTHheader = req.headers.authorization;
    if(!AUTHheader || !AUTHheader.startsWith('Bearer')) {
        return res.status(400).json({msg: Statuscode.code400})
    }
    const token = AUTHheader.split(' ')[1];
    try{
        const decode= jwt.verify(token, process.env.JwtSecret);
        req.userid = decode;
        next();
    }
    catch{
        res.status(411).json({msg: "invalid token",statuse:false})
    }
}