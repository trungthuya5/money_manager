import {NextFunction, Request, Response} from "express";
import BaseResponse from "../entity/BaseResponse";
import * as jwt from "jsonwebtoken";

export function auth(req: Request, res: Response, next: NextFunction) {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.json(new BaseResponse(404, "A token is required for authentication"));
    }
    try {
        const decoded: any = jwt.verify(token, "secret1123");
        req.body.userId = decoded.data.userId;

    } catch (err) {
        return res.json(new BaseResponse(404, "Invalid Token", err));
    }

    next();
}