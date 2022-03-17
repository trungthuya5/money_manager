import { Controller, Get, Middleware, Post } from '../utils/decorators';


import {Request, Response} from 'express'
import { sayGoodbye } from './test';
import { UserModel } from '../models';
import BaseResponse from '../entity/BaseResponse';

@Controller('user')
export class UserController{
    

    constructor(){

    }

    @Get()
    @Middleware(sayGoodbye)
    public async index(req:Request, res:Response){

        try {
            const users = await UserModel.getInstance().getAll();
            console.log(users);
            
            res.json(new BaseResponse(0,"",users))
        }catch(e){
            console.log(e);
            
            res.json(new BaseResponse(0,"error",e))
        }
        
    }

    
}