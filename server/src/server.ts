/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import env from './config/env';
 

dotenv.config();

let server: Server;

const startServer = async () => {
    await mongoose.connect(env.MONGO_URI as string);
    console.log(`Database connected`);

    server = app.listen( env?.PORT || 3002, () => {
        console.log(`Server started on http://localhost:${ env?.PORT || 3002}`);
    })
}


// START SERVER
(
    async() => {
        await startServer();
        // await createSeedSuperAdmin();
    }
)()



// GLOBAL REJECTION HANDLING
process.on("SIGTERM", (err) => {
    console.log(`SIGTERM alert, server shutting down`,  err);

    if(server) {
        server.close(()=> {
            process.exit(1);
        })
    }
})
process.on("SIGINT", (err) => {
    console.log(`SIGINT ALERT DETECTED, server shutting down`,  err);

    if(server) {
        server.close(()=> {
            process.exit(1);
        })
    }
})
process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Rejection detected, server shutting down`,  err);

    if(server) {
        server.close(()=> {
            process.exit(1);
        })
    }
})
process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception detected, server shutting down`,  err);

    if(server) {
        server.close(()=> {
            process.exit(1);
        })
    }
})