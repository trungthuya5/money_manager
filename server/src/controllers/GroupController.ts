import { Response, Request } from "express";
import BaseResponse from "../entity/BaseResponse";
import { Controller, Get, Middleware, Post } from "../utils";
import {IGroup} from "../entity";
import {auth} from "../libs/middleware";

@Controller('group')
export class GroupController {

    @Get()
    public async index(req: Request, res: Response) {
        // GroupModel.getInstance().get()
    }

    @Post('save')
    @Middleware(auth)
    public async save(req: Request, res: Response) {
        const { userId, type, name, des = "" } = req.body;

        try {

            if (!type || !name) return new BaseResponse(404, "Lỗi tham số")

            let group: IGroup = { userId, type, name ,des}

            // const data = await GroupModel.getInstance().save(group);
            let data= ""
            return new BaseResponse(0, "Thêm thành công", data)
        } catch (err) {
            return new BaseResponse(404, "Hệ thống bận", err)
        }


    }
}