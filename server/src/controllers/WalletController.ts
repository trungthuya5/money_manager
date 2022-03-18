import {Controller, Delete, Get, Post, Put} from "../utils";
import {Request, Response} from "express";
import {WalletModel} from "../models";
import {IWallet} from "../entity";
import BaseResponse from "../entity/BaseResponse";

@Controller('wallet')
export class WalletController {
    @Get()
    public async index(req: Request, res: Response) {
        const {userId} = req.body
        const wallets = await WalletModel.instance.findMany(userId) as IWallet[];
        return new BaseResponse(0, "", wallets)
    }

    @Get(':id')
    public async show(req: Request, res: Response) {
        const {userId} = req.body
        const {id} = req.params

        if (!id) return new BaseResponse(404, "Error Params")

        const wallet = await WalletModel.instance.findFirst(userId, Number(id)) as IWallet
        return new BaseResponse(0, "", wallet)

    }

    @Post()
    public async store(req: Request, res: Response) {
        const {userId, name} = req.body

        try {
            if (!name) return new BaseResponse(404, "error params")

            const wallet = {userId, name} as IWallet;
            let ret = await WalletModel.instance.save(wallet)
            return new BaseResponse(0, "ok", ret)
        } catch (e) {
            console.log(e)
            return new BaseResponse(404, "Hệ thống bận")
        }
    }

    @Put(':id')
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
    public async delete(req: Request, res: Response) {
        const {name, userId} = req.body
        const {id} = req.params

        try {
            let ret = await WalletModel.instance.deleteWalletById(Number(userId), Number(id))

            if(ret) return new BaseResponse(0, "ok", ret)
            else return new BaseResponse(1, "error", ret)
        } catch (e) {
            console.log(e)
            return new BaseResponse(404, "Hệ thống bận")
        }
    }
}