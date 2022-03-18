import {Model} from "./Model";
import {User} from  '../entity'

export class IncomeModel extends Model {

    private static _instance: IncomeModel;
    private table:string = "group";

    public static get instance(): IncomeModel {
        return this._instance || (this._instance = new this())
    }


    constructor() {
        super()
    }

    public async findFirst(userId: number) {
        return await  this.findOne(this.table,{userId})
    }

    public async findMany() {
        return await this.findAll(this.table,{})
    }

    public async save(data: User) {
        return await this.insert(this.table, data)
    }

    public async updateById(id: number, data: User) {
        return await this.update(this.table, data, {id})
    }
}