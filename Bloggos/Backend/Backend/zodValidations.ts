import {z} from 'zod'

let signinSchema = z.object({
    email:z.string().email(),
    password:z.string().min(8)
})

let signupSchema = z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(8)
})

let createBlogSchema = z.object({
    title:z.string(),
    content:z.string()
})

let updateBlogSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional()
})

export {signinSchema, signupSchema, createBlogSchema, updateBlogSchema}