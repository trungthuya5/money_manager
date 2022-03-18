import { Response, Request } from "express";
import BaseResponse from "../entity/BaseResponse";
import {Controller, Delete, Get, Middleware, Post, Put} from "../utils";
import {IGroup, IWallet} from "../entity";
import {auth} from "../libs/middleware";
import {GroupModel, WalletModel} from "../models";

@Controller('group')
export class GroupController {

    @Get()
    @Middleware(auth)
    public async index(req: Request, res: Response) {
        const {userId} = req.body

        try{
            const groups = await  GroupModel.instance.findMany(userId) as IGroup[];
            return new BaseResponse(0,"ok", groups)
        }catch (e){
            return new BaseResponse(404, "Hệ thống bận",e)
        }
    }

    @Get(':id')
    @Middleware(auth)
    public async show(req: Request, res: Response) {
        const {userId} = req.body
        const {id} = req.params

        if (!id) return new BaseResponse(404, "Error Params")

        const group = await GroupModel.instance.findFirst(userId, Number(id)) as IGroup
        return new BaseResponse(0, "", group)

    }

    @Post('')
    @Middleware(auth)
    public async store(req: Request, res: Response) {
        const { userId, type, name, des = "" } = req.body;

        try {

            if (!type || !name) return new BaseResponse(404, "Lỗi tham số")

            let group: IGroup = { userId, type, name ,des}

             const data = await GroupModel.instance.save(group);

            if(data) return new BaseResponse(0, "Thêm thành công", data)
            else return new BaseResponse(0, "Thêm thất bại", data)
        } catch (err) {
            return new BaseResponse(404, "Hệ thống bận", err)
        }

    }

    @Put(':id')
    @Middleware(auth)
    public async update(req: Request, res: Response) {

        const {name, userId} = req.body
        const {id} = req.params

        try {
            let wallet = {name} as IWallet;
            let ret = await WalletModel.instance.updateWalletById(Number(userId), Number(id), wallet)
            return new BaseResponse(0, "ok", ret)
        } catch (e) {
            console.log(e)
            return new BaseResponse(404, "Hệ thống bận")
        }
    }

    @Delete(':id')
    @Middleware(auth)
    public async delete(req: Request, res: Response) {
        const {userId} = req.body
        const {id} = req.params

        try {
            let ret = await GroupModel.instance.deleteGroupById(Number(userId), Number(id))

            if(ret) return new BaseResponse(0, "ok", ret)
            else return new BaseResponse(1, "error", ret)
        } catch (e) {
            console.log(e)
            return new BaseResponse(404, "Hệ thống bận")
        }
    }
}