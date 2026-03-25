import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { User, type IUser } from "../model/User";
import type { HydratedDocument } from "mongoose";
import { Class } from "../model/Class";

interface AuthRequest extends Request {
    user ?: HydratedDocument<IUser>
}

const StudentsRouter = Router();

StudentsRouter.use("", async(req:AuthRequest, res:Response, next: NextFunction) =>{
    const token = req.headers["authorization"];
    if(!token) return res.status(401).json({
        success : false,
        error : 'Unauthorized, token missing or invalid'
    })

    const stripToken = token.replace(/^Bearer\s+/ , '');
    let email : String | jwt.JwtPayload
    try {
        email = jwt.verify(stripToken, "secret");
    }
    catch{
        return res.status(401).json({
            success : false,
            error : "Unauthorized, token missing or invalid"
        })
    }

    const user = await User.findOne({email : email});
    if(!user || user.role == "student"){
        return res.status(403).json({
            success : false,
            error : 'Forbidden, teacher access required'
        })
    }

    req.user = user;
    next();
})

StudentsRouter.get("/myStudents", async(req: AuthRequest, res:Response)=>{
    const teacher = req.user;
    if(!teacher){
        return res.status(403).json({
            success : false,
            error : 'Forbidden, teacher access required'
        })
    }
    const allClasses = await Class.find({teacherId: teacher._id});
    console.log(allClasses);
    const allStudentIds = allClasses.flatMap(c =>
        c.studentIds.map(id => id.toString())
    );

    const students = await User.find({
        _id: { $in: allStudentIds }
    });

    const studentMap = new Map(
        students.map(s => [s._id.toString(), s])
    );

    const MyStudentsList : Record<
        string,
        {
            _id : string,
            name : string,
            email : string,
            Classes : {
                ClassCode : string,
                ClassName : string
            }[];
        }
    > = {};

    for ( const thisClass of allClasses){
        for (const studentId of thisClass.studentIds){
            const student = studentMap.get(studentId.toString());
            if(!student) continue;

            const key = studentId.toString();
            if(!MyStudentsList[key]){
                MyStudentsList[key] = {
                    _id : key,
                    name : student.name,
                    email : student.email,
                    Classes : []
                }
            }

            MyStudentsList[key].Classes.push({
                ClassName : thisClass.className,
                ClassCode : thisClass._id.toString()
            })
        }
    }

    const ReturnList = Object.values(MyStudentsList);
    console.log("ReturnList", ReturnList);
    return res.status(200).json({
        success : true,
        data : ReturnList
    })
})


StudentsRouter.get("/", async(req: AuthRequest, res: Response)=>{
    const teacher = req.user;
    if(!teacher){
        return res.status(403).json({
            success : false,
            error : 'Forbidden, teacher access required'
        })
    }
    const students = await User.find({role: "student"})

    const returnList : {
        _id : string,
        name : string,
        email: string
    }[] = students.map( ( student) =>{
        return {
            _id : student._id.toString(),
            name : student.name,
            email : student.email
        }
    })

    return res.status(200).json({
        success : true,
        data : returnList,
    })
})
export default StudentsRouter;
