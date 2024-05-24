import zod, { number, string } from 'zod';

export const signup = zod.object({
    firstname: string(),
    lastname: string(),
    username: string().email(),
    password: string().min(5),
});

export const signin = zod.object({
    username: string().email(),
    password: string().min(5),
});

export const update = zod.object({
    firstname: string(),
    lastname: string(),
    password: string().min(5),
});

export const navbar = zod.object({
    Home: number(),
    Notification: number(),
    Connections: number(),
    Messages: number(),
})
