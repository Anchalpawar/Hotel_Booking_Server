import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";


export let verifyToken = (req, res, next) => {
    let token = req.cookies.access_token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    //console.log("Token:", token); // Add this line to log the token

    if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return next(createError(401, "Token expired"));
            }
            return next(createError(403, "Token is not valid!"));
        }
        req.user = user;
        next();
    });
};


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.Id || req.user.isAdmin) {
            next()
        } else {
             return next(createError(403, "You are not authorized!"));
        }
    });
};


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            console.log("I am admin");
            next()
        } else {
            console.log("I am not admin")
             return next(createError(403, "You are not authorized!"));
        }
    });
};