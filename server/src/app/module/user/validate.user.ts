import z  from 'zod';


export const UserZodSchema = z.object({
        full_name: z
                .string({error: "Name must be string type"})
                .min(3, {error: "Minimum 3 character"})
                .max(100, {error: "Minimum 100 character"}),
        email: z
                .string({error: "Email must be string type"})
                .email(),
        password: z
                        .string()
                        .min(6, {error: "Password must be minimum 6 length"})
                        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {error: "Password must be at least 1 uppercase character, 1 special character, 1 number and at least 6 character"}),
        picture: z
                .string({error: "Picure must be string type"})
                .optional(),
        bio: z
                .string({error: "Bio must be string type"})
                .min(3, {error: "Minimum 3 character"})
                .max(100, {error: "Maximum 100 character"})

})


export const UpdateUserZodSchema = z.object({
        full_name: z
                .string({error: "Name must be string type"})
                .min(3, {error: "Minimum 3 character"})
                .max(100, {error: "Minimum 100 character"})
                .optional(),
        email: z
                .string({error: "Email must be string type"})
                .email()
                .optional(),
        password: z
                        .string()
                        .min(6, {error: "Password must be minimum 6 length"})
                        .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/, {error: "Password must be at least 1 uppercase character, 1 special character, 1 number and at least 6 character"})
                        .optional(),
        picture: z
                .string({error: "Picure must be string type"})
                .optional(),
        bio: z
                .string({error: "Bio must be string type"})
                .min(3, {error: "Minimum 3 character"})
                .max(100, {error: "Maximum 100 character"})
                .optional()
})