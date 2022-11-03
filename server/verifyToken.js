import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
    console.log("Verificando")
    const authHeader = req.headers["x-authorization"] || req.headers["authorization"] || "";
    const token = authHeader?.split(" ")[authHeader?.split(" ").length - 1];

    console.log(token);
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    });
};