const zod = require('zod');

const UserSchema = zod.object({
    username : zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string().min(5),
})

const SigninSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5)
})

const UpdateSchema = zod.object({
    firstname: zod.string().min(1),
    lastname: zod.string().min(1),
    password: zod.string().min(5)
})

module.exports  = {
    UserSchema,
    SigninSchema,
    UpdateSchema
}