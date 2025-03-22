import express from "express"
import jwt from "jsonwebtoken"
import { jwtConfig } from "../config"

// Middleware to validate token
export const authenticate = (req: any, res: express.Response, next: express.NextFunction) => {
    try {
        let authorization = String(req?.headers?.[jwtConfig.headerKey])

        if (!authorization) return next();

        let token = authorization?.split(" ")?.[1]
        if (!token) return next();

        let userData = verifyJwtToken(token);
        if (!userData) return next();

        req.user = userData;

        return next();
    } catch (error) {
        console.error(error)
        next();
    }
}

const verifyJwtToken = (token: string) => {
    try {
        return jwt.verify(token, jwtConfig.secret);
    } catch (err) {
        console.log(err);
        return;
    }
}

export const createJwtToken = (data: any) => {
    return jwt.sign(data, jwtConfig.secret, { expiresIn: '24h' });
}