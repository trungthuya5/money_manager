import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import BaseResponse from '../entity/BaseResponse';
//


export function sayHello(req: Request, res: Response, next: NextFunction) {
    // tslint:disable-next-line:no-console
    console.log('Hello OvernightJS! ' + req.method + ' ' + req.originalUrl);
    next();
}

export function sayGoodbye(req: Request, res: Response, next: NextFunction) {
    // tslint:disable-next-line:no-console
    console.log('Goodbye OvernightJS! ' + req.method + ' ' + req.originalUrl);
    next();
}


export function auth(req: Request, res: Response, next: NextFunction) {

    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.json(new BaseResponse(404, "A token is required for authentication"));
    }
    try {
        const decoded = jwt.verify(token, "secret1123");
        console.log(decoded);
        req.body.userId = decoded;

    } catch (err) {
        return res.json(new BaseResponse(404, "Invalid Token", err));
    }

    next();
}


let HOST = 'http://localhost:3000/'

// export async function test1() {
//     await get()
// }

// async function get() {
//     let signin = await fetch(HOST + 'auth/signin', {
//         method: 'post',
//         body: JSON.stringify({
//             username: 'trungthuya5',
//             password: '123456'
//         }),
//         headers: {'Content-Type': 'application/json'}
//     });
//
//     console.log(await signin.json())
// }