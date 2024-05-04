const z = require('zod');

const CreateTodo = z.object({
    title: z.string().min(3),
    description: z.string().min(3)
});

const UpdateTodo = z.object({
    id: z.string().min(3)
});

module.exports = {
    CreateTodo,
    UpdateTodo
}