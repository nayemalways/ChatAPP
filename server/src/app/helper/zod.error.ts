/* eslint-disable @typescript-eslint/no-explicit-any */

import { IErrorSources, IGenricsErrorResponse } from "../interface/error.types";

 


// export const zodErrorHandler = (err: any) : IGenricsErrorResponse => {
//     const errorSources: IErrorSources[] = [];
//     err.issues.forEach((issue: any) => {
//         errorSources.push({
//             path: issue.path[issue.path.at(-1)],
//             message: issue.message
//         })
//     });

//     return {
//         statusCode: 400,
//         message: 'Zod Validation Error',
//         errorSources
//     }
// }

export const zodErrorHandler = (err: any): IGenricsErrorResponse => {
  const errorSources: IErrorSources[] = [];
  err.issues.forEach((issue: any) => {
    errorSources.push({
      path: issue.path[0], // catch last field of error
      message: issue.message,
    });
  });

  return {
    statusCode: 400,
    message: 'Zod Validation Error',
    errorSources,
  };
};