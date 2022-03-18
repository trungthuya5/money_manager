import { Controller, Get, Middleware, Post } from '../utils/decorators';


import {Request, Response} from 'express'
import { UserModel } from '../models';
import BaseResponse from '../entity/BaseResponse';
import {auth} from "../libs/middleware";

@Controller('user')
export class UserController{
    

    constructor(){

    }

    @Get()
    @Middleware(auth)
    public async index(req:Request, res:Response){

        try {
            const users = await UserModel.instance.findMany();
            res.json(new BaseResponse(0,"",users))
        }catch(e){
            console.log(e);
            
            res.json(new BaseResponse(0,"error",e))
        }
        
    }

    
}