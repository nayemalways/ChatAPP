import z  from 'zod';
import { IsActive, Role } from './user.interface';


export const UserZodSchema = z.object({
     name: z
            .string({error: "Name must be string type"})
            .min(3, {error: "Minimum 3 character"})
            .max(100, {error: "Minimum 100 character"}),
    email: z
            .string({error: "Email must be string type"})
            .email(),
    password: z
                .string()
                .min(6, {error: "Password must be minimum 6 length"})
                .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {error: "Password must be at least 1 uppercase character, 1 special character, 1 number and at least 6 character"})
                .optional(),
    
    phone: z    
            .string({error: "phone must be string type"})
            .regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Not a valid number")
            .optional(),
    address: z
                .string( {error: "Address must be string type"})
                .max(200, {message: "Too long, address maximum length 200 character"})
                .optional()
})


export const UpdateUserZodSchema = z.object({
     name: z
            .string({error: "Name must be string type"})
            .min(3, {error: "Minimum 3 character"})
            .max(100, {error: "Minimum 100 character"})
            .optional(),
    email: z
            .string({error: "Email must be string type"})
            .email()
            .optional(),
    
    phone: z    
            .string({error: "phone must be string type"})
            .regex(/^(?:\+?88)?01[3-9]\d{8}$/, "Not a valid number")
            .optional(),
    address: z
                .string( {error: "Address must be string type"})
                .max(200, {message: "Too long, address maximum length 200 character"})
                .optional(),
    isDeleted: z
                .boolean({message: "Must be true or false type"})
                .optional(),
    isVerified: z
                .boolean({message: "Must be true or false type"})
                .optional(),
    isActive: z
                .enum(Object.values(IsActive)).optional(),
    role: z
            .enum(Object.values(Role)).optional()
})