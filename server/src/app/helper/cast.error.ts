/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { IGenricsErrorResponse } from "../interface/error.types";

export const handleCastError = (
  err: mongoose.Error.CastError
): IGenricsErrorResponse => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectId. Please provide a valid id!",
  };
};
