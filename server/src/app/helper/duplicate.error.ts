/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenricsErrorResponse } from "../interface/error.types";

export const handleDuplicateError = (err: any): IGenricsErrorResponse => {
  const matchedArray = err.message.match(/"([^]*)"/);

  return {
    statusCode: 400,
    message: `${matchedArray[1]} - is already exist!`,
  };
};
