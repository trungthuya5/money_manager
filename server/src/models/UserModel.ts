import {Model} from "./Model";
import {IUser, User} from '../entity'

export class UserModel extends Model {

    private static _instance: UserModel;
    private table:string = "user";

    public static get instance(): UserModel {
        return this._instance || (this._instance = new this())
    }


    constructor() {
        super()
    }

    public async findFirst(userId: number) {
        return await  this.find(this.table,{userId})
    }

    public async findMany() {
       return await this.all(this.table,{})
    }

    public async save(data: IUser) {
       return await this.create(this.table, data)
    }

    public async updateByUserId(userId: number, data: User) {
        return await this.update(this.table, data, {userId})
    }

    public async getUserByUsername(username: string) {
       return await this.find(this.table, {username})
    }

    public async getUserByLogin(username: string, password: string){
        return await this.find(this.table, {username, password})
    }


}