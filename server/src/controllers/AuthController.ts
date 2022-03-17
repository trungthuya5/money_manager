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

        let { username, password, fullname } = req.body;

        try {
            if (!username || !password || !fullname) {
                return new BaseResponse(404, "Lỗi tham số");
            }

            const count = await UserModel.getInstance().getUserByUsername(username) as User[];
            if (count.length) return new BaseResponse(1, "Tài khoản đã tồn tại");

            const user = new User(username, md5(password), fullname);

            const data = await UserModel.getInstance().save(user);

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
           // let a = await ModelTest.getInstance().insert("group", {userId: "1", type: "1", name: "aa", des: "3"})
           let a = await ModelTest.getInstance().update("group",{name:"bb"}, {userId:'1'})
            let b = await ModelTest.getInstance().findAll("group", {userId: 1})
            let c = await ModelTest.getInstance().findOne("group", {userId: 1})

            console.log(a)
            console.log(b)
            console.log(c)

            if (!username || !password) {
                return new BaseResponse(404, "Lỗi tham số")
            }

            const pass = md5(password) as string
            const user = await UserModel.getInstance().getUserByLogin(username, pass);

            if (!user) return new BaseResponse(3, "Tài khoản không tồn tại")

            const data = { userId: user.id, fullname: user.fullname }
            const token = jwt.sign({ data }, 'secret1123');


            return new BaseResponse(0, "Đăng nhập thành công", token)


        } catch (error) {
            console.log(error)
            return new BaseResponse(404, "Hệ thống bận")
        }
    }
}