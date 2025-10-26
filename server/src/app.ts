import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { GlobalRoutes } from './router/routes';
import { globalErrorhandler } from './app/middleware/globalErrorHandler';
import { NotFound } from './app/middleware/NotFound';
import http from 'http';



const app = express();
const server = http.createServer(app);


// Middleware setup
app.use(cors());
app.use(express.json({limit: '4mb'}));
app.use(cookieParser());

app.get("/", (req: Request, res: Response ) => {
    res.send('Welcome to the show');
})


app.use("/api/v1", GlobalRoutes);

app.use(NotFound);
app.use(globalErrorhandler);


export default server;