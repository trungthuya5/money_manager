import {Model} from "./Model";
import {IGroup, User} from '../entity'

export class GroupModel extends Model {

    private static _instance: GroupModel;
    private table:string = "group";

    public static get instance(): GroupModel {
        return this._instance || (this._instance = new this())
    }


    constructor() {
        super()
    }

    public async findFirst(userId: number, id:number) {
        return await  this.find(this.table,{userId, id})
    }

    public async findMany(userId:number) {
        return await this.all(this.table,{userId})
    }

    public async save(data: IGroup) {
        return await this.create(this.table, data)
    }

    public async updateById(id: number, data: IGroup) {
        return await this.update(this.table, data, {id})
    }

    public async deleteGroupById(userId:number, id: number) {
        return await this.delete(this.table, {id, userId})
    }
}