/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/errorHelper";
import env from "../../config/env";
 
import { handleDuplicateError } from "../helper/duplicate.error";
import { zodErrorHandler } from "../helper/zod.error";
import { handleCastError } from "../helper/cast.error";
import { validationError } from "../helper/validation.error";
import { IErrorSources } from "../interface/error.types";

export const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something went wrong ${err.message}`;
  let errorSources: IErrorSources[] = [];
  



  // Duplicate Error
  if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Zod Error
  else if (err.name === "ZodError") {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as IErrorSources[];
  }

  // Cast Error
  else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }

  // Validation Error
  else if (err.name === "ValidationError") {
    const simplifiedError = validationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as IErrorSources[];
  }

  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: env?.NODE_ENV === "development" ? err.stack : null,
  });
};
