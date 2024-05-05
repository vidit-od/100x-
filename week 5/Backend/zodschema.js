const z = require('zod');

const CreateTodo = z.object({
    title: z.string().min(3),
    description: z.string().min(3)
});

const UpdateTodo = z.object({
    id: z.string().min(3)
});

const UserSchema = z.object({
    Username: z.string().min(5),
    Password: z.string().min(5),
})
module.exports = {
    CreateTodo,
    UpdateTodo,
    UserSchema
}