import { Response } from "express";


export const SetCookie = (res: Response, tokens: string) => {
    if(tokens) {
        res.cookie("refreshToken", tokens, {
            httpOnly: true,
            secure: true, // only true in prod (HTTPS)
            sameSite: 'none', 
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
    }
}
