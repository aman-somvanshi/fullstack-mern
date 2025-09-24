import z from 'zod';

export const signupInput = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().optional()
}) // This is a runtime variable and will be used in the backend


export const signinInput = z.object({
    email: z.email(),
    password: z.string().min(6),
}) // This is a runtime variable and will be used in the backend

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean()
})

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    published: z.boolean()
})

export type SignupInput = z.infer<typeof signupInput>; // This is a compile time variable which uses the concept of type inference in zod. This variable will be used on the frontend.
// But this variable is present in the backend folder and cannot be exported to the frontend. You don't want that to happen. So you make 3 modules - frontend, backend and common modules.

export type SigninInput = z.infer<typeof signinInput>; 

export type CreateBlogInput = z.infer<typeof createBlogInput>; 

export type UpdateBlogInput = z.infer<typeof updateBlogInput>; 
