
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';


export const GenerateToken = ( payload: JwtPayload, secret:string, expiration: string ) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: expiration
    } as SignOptions)

    return token;
}

export const DecodeToken = ( token: string, secret: string ) => {
    const VerifyUser = jwt.verify(token, secret);
    return VerifyUser;
}

export const verifyToken = (token: string, secret: string) => {
  const verified = jwt.verify(token, secret);
  return verified;
};