/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/errorHelper";
import env from "../../config/env";


export const globalErrorhandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = `Something went wrong ${err.message}`;

    if(err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }else if(err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message,
        err,
        stack: env?.NODE_ENV === "development" ? err.stack : null
    })
}