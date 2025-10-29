import z  from 'zod';


export const UserZodSchema = z.object({
        full_name: z
                .string({error: "Full name must be string type"})
                .min(3, {error: "Full name minimum 3 character"})
                .max(100, {error: "Full name maximum 100 character"}),
        email: z
                .string({error: "Email must be string type"})
                .email(),
        password: z
                        .string()
                        .min(6, {error: "Password must be minimum 6 length"}),
         picture: z
                .string({error: "Picure must be string type"})
                .optional(),
        bio: z
                .string({error: "Bio must be string type"})
                .min(3, {error: "Bio minimum 3 character"})
                .max(100, {error: "Bio maximum 100 character"})

})


export const UpdateUserZodSchema = z.object({
        full_name: z
                .string({error: "Full name must be string type"})
                .min(3, {error: "Full name minimum 3 character"})
                .max(100, {error: "Full name maximum 100 character"})
                .optional(),
        email: z
                .string({error: "Email must be string type"})
                .email()
                .optional(),
        picture: z
                .string({error: "Picure must be string type"})
                .optional(),
        bio: z
                .string({error: "Bio must be string type"})
                .min(3, {error: "Bio minimum 3 character"})
                .max(100, {error: "Bio maximum 100 character"})
                .optional()
})