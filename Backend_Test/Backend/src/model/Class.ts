import mongoose, { Types, type InferSchemaType } from "mongoose";

const classSchema = new mongoose.Schema({
    className   : {
        type : String,
        required : true,
    },
    teacherId   : {
        type : Types.ObjectId,
        required : true,
    },
    studentIds  : {
        type : [Types.ObjectId],
        required : true,
    }
})

export type IClass = InferSchemaType<typeof classSchema> & {
    _id : Types.ObjectId
}

export const Class = mongoose.model<IClass>("Class", classSchema);
