import { NextFunction, Request, Response } from "express"


type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const CatchAsync = (fn: AsyncFn) => async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
    .catch((err) => {
         next(err);
    })
}