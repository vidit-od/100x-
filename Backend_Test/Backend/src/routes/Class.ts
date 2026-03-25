import { Router } from "express";
import jwt  from "jsonwebtoken";
import { User } from "../model/User";
import type { Request, Response, NextFunction } from "express";
import type { HydratedDocument } from "mongoose";
import type { IUser } from "../model/User";
import { addStudentSchema, ClassSchema } from "../utils/zodSchemas";
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

ClassRouter.post("/:id/add-student", async(req:AuthRequest, res: Response)=>{
    const ClassId = req.params.id;
    const user = req.user;
    if(!user || user.role == "student"){
        return res.status(403).json({
            success : false,
            error : 'Forbidden, teacher access required'
        })
    }
    const OurClass = await Class.findById(ClassId);

    if(!OurClass) return res.status(404).json({
        success : false,
        error: 'Class not found'
    })

    if( OurClass.teacherId.toString() != user._id.toString()) {
        return res.status(403).json({
            success : false,
            error : 'Forbidden, not class teacher'
        })
    }

    const body = req.body;
    const result = addStudentSchema.safeParse(body);

    if (!result.success) return res.status(400).json({
        success : false,
        error : "Invalid request schema"
    })

    const studentId = result.data.studentId;
    const Student = await User.findById(studentId);

    if(!Student) return res.status(404).json({
        success : false,
        error : 'Student not found'
    })

    if(!OurClass.studentIds.find(s => s.toString() === studentId)){
        const newClass = await Class.updateOne({_id : OurClass._id},{
            studentIds : [...OurClass.studentIds, Student._id],
        })
        if(newClass) OurClass.studentIds.push(Student._id);
    }

    return res.status(200).json({
        success : true,
        data :{
            studentIds : OurClass.studentIds,
        }
    })
})

ClassRouter.get("/:id", async(req:AuthRequest, res:Response)=>{
    const classId = req.params.id;
    const OurClass = await Class.findById(classId);
    if(!OurClass) return res.status(404).json({
        success: false,
        error: 'Class not found'
    })

    const user = req.user;

    if(!user
        || (user.role == "student" && !OurClass.studentIds.find(s => s.toString() === user._id.toString()))
        || (user.role == "teacher" && user._id.toString() != OurClass.teacherId.toString())){
        return res.status(403).json({
            success: false,
            error: 'Forbidden, not class teacher'
        })
    }


    const Students = await Promise.all(
        OurClass.studentIds.map( async(id) =>{
            const student = await User.findById(id);
            if(!student) return null
            return{
                _id : student._id,
                name : student.name,
                email : student.email,
            }
        }))
    const returnList = {
        _id : OurClass._id,
        className : OurClass.className,
        teacherId : OurClass.teacherId,
        students : Students.filter(Boolean)
    }

    return res.status(200).json({
        success : true,
        data : returnList
    })
})
export default ClassRouter;
