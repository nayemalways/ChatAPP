import { NextFunction, Request, Response } from "express";
import {  ZodObject } from "zod";


export const validateRequest =  (ZodSchema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        if(typeof req.body?.data === "string" ) {
            req.body = JSON.parse(req.body?.data)
        }
        
        req.body = await ZodSchema.parseAsync(req.body);
        next();
    } catch (error) {
        next(error);
    }
}