import dotenv from 'dotenv';
dotenv.config();


interface IENV {
    MONGO_URI: string;
    PORT: string;
    NODE_ENV: string;
    BCRYPT_SALT_ROUND: string;
    JWT_SECRET_CODE: string;
    JWT_EXPIRATION_TIME: string;
    JWT_RERESH_EXPIRATION: string;
    JWT_REFRESH_SECRET: string;
    SUPER_ADMIN_EMAIL: string;
    SUPER_ADMIN_PASSWORD: string;
    CLOUDINARY_APP_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
}

const loadEnvVariables = (): IENV => {
    const envVar: string[] = ["MONGO_URI", "PORT", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_EXPIRATION_TIME", "JWT_SECRET_CODE", "JWT_REFRESH_SECRET", "JWT_RERESH_EXPIRATION", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD", "CLOUDINARY_APP_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"];

    envVar.forEach((item) => {
        if(!process.env[item]) {
            throw new Error(`Missing ENV Variable: ${ item }` );
        }
    })

    return {
        MONGO_URI: process.env.MONGO_URI as string,
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_SECRET_CODE: process.env.JWT_SECRET_CODE as string,
        JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        JWT_RERESH_EXPIRATION: process.env.JWT_RERESH_EXPIRATION as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        CLOUDINARY_APP_NAME: process.env.CLOUDINARY_APP_NAME as string,
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    }
}


export default loadEnvVariables();
