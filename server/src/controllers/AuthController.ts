import { NextFunction, Request, Response } from "express";
import BaseResponse from "../entity/BaseResponse";
import { UserModel } from "../models";
import { Controller, Post, Middleware } from "../utils/decorators";
import md5 from 'md5'
import * as jwt from 'jsonwebtoken'
import {IUser, User} from "../entity";
import {ModelTest} from "../models/ModelTest";
import {Model} from "../models/Model";


@Controller('auth')
export class AuthController {

    // đăng kí
    @Post('signup')
    public async register(req: Request, res: Response) {

        let { username, password, fullName } = req.body;

        try {
            if (!username || !password || !fullName) {
                return new BaseResponse(404, "Lỗi tham số");
            }

            const count = await UserModel.instance.getUserByUsername(username) as IUser[];
            if (count.length) return new BaseResponse(1, "Tài khoản đã tồn tại");

            const user:IUser = {username, password: md5(password), full_name:fullName};

            const data = await UserModel.instance.save(user);

            return new BaseResponse(0, "Tạo tài khoản thành công", data);


        } catch (error) {
            return new BaseResponse(404, "Hệ thống bận")
        }

    }

    // đăng nhập
    @Post('signin')
    public async login(req: Request, res: Response) {

        const { username, password } = req.body;

        try {

            if (!username || !password) {
                return new BaseResponse(404, "Lỗi tham số")
            }

            const pass = md5(password) as string
            const user = await UserModel.instance.getUserByLogin(username, pass) as IUser;

            if (!user) return new BaseResponse(3, "Tài khoản không tồn tại")

            const data = { userId: user.id, full_name: user.full_name }
            const token = jwt.sign({ data }, 'secret1123');
            return new BaseResponse(0, "Đăng nhập thành công", token)


        } catch (error) {
            console.log(error)
            return new BaseResponse(404, "Hệ thống bận")
        }
    }
}