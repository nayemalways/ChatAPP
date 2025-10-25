import { Response } from "express";

 interface TMeta {
    total: number
 }

interface ISendResponse<T> {
    statusCode : number;
    success: boolean;
    message: string;
    data?: T,
    meta?: TMeta
}

export const SendResponse = <T>(res: Response, data: ISendResponse<T>) => {

    res.status(data?.statusCode).json({
        statusCode: data?.statusCode,
        success: data?.success,
        message: data?.message,
        data: data?.data,
        meta: data?.meta
    })
}