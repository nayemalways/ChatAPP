import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { GlobalRoutes } from './router/routes';
import { globalErrorhandler } from './app/middleware/globalErrorHandler';
import { NotFound } from './app/middleware/NotFound';


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response ) => {
    res.send('Welcome to the show');
})


app.use("/api/v1", GlobalRoutes);

app.use(NotFound);
app.use(globalErrorhandler);


export default app;