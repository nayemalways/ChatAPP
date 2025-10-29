/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { IErrorSources, IGenricsErrorResponse } from "../interface/error.types";

export const validationError = (
  err: mongoose.Error.ValidationError
): IGenricsErrorResponse => {
  const errorSources: IErrorSources[] = [];
  const error = Object.values(err.errors);
  error.forEach((errorObject: any) => {
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    });
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};
