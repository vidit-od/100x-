import {email, string, z} from "zod"

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "short password"),
  role: z.enum(["teacher" , "student"])
})

export const LoginSchema = z.object({
  email : z.string().email(),
  password : z.string().min(6, "short password")
})
