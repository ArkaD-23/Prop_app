import jwt from 'jsonwebtoken';
import { errorHandeler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandeler(401, "You are not authenticated ."));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandeler(403, "Token is not valid"));

        req.user = user;
        next();
    });
}